import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/components/navigation.module.css';
import {useState, useEffect} from 'react';
import { getData } from '../components/request';
import Link from 'next/link';

export default function Navigation(){
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData(`https://medical.pirveli.ge/medical/categories`)
            .then((response)=> setCategories(response));
    }, [])
    
    return <>
        <div className={styles.catalogContainer}>
            {categories?.map((item, index) => {
                const subCategories = categories.filter(
                    (e) => e.parentCategoryId == item.id
                );
                const items = subCategories.map((e, key) => {
                    return {
                        key: key,
                        label: (
                            <Link
                                target='_blank'
                                rel='noopener noreferrer'
                                href={`/clinicPage?id=${e.id}`}
                            >
                                {e.title}
                            </Link>
                        ),
                    };
                });

                return (
                    <>
                        {item.parentCategoryId === null &&
                            (items.length > 0 ? (
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement='bottom'
                                    overlayClassName={styles.dropdown}
                                >
                                    <span
                                        key={index}
                                        className={styles.catalogTextStyle}
                                    >
                                        <Link
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={`/clinicPage?id=${item.id}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </span>
                                </Dropdown>
                            ) : (
                                <span
                                    key={index}
                                    className={styles.catalogTextStyle}
                                >
                                    <Link
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={item.title !== "ყველა" ? `/clinicPage?id=${item.id}` : "/clinicPage"}
                                    >
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                    </>
                );
            })}
        </div>
    </>
}