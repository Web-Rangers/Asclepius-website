import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from "react-redux";
import { Breadcrumb } from 'antd';
import { ReactSVG } from 'react-svg';
import Table from '../../../../components/TableWithSort';
import { getData } from '../../../../components/request';
import Navigation from '../../../../components/navigation';
import styles from '../../../../styles/pages/services.module.css';

export default function Services() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [clinic, setClinic] = useState({});
    const [search, setSearch] = useState('');
    const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
	const categories = useSelector((state)=> state.categories.categories);

    const columns = [
        {
            key: "title",
            title: "მომსახურების სახელი",
            dataIndex: "title",
        },
        {
            key: "productName",
            title: "ფასდაკლება ( % )",
            dataIndex: "productName",
            sort: true,
        },
        {
            key: "entries",
            title: "არსებული ფასი",
            dataIndex: "entries",
            sort: true,
        },
        {
            key: "amount",
            title: "შემოთავაზებული ფასი",
            dataIndex: "amount",
            sort: true,
        }
    ];

    const dummyData = [
        {
            title: 'თრომბოციტების გადასხმა',
            productName: '22%',
            entries: '197.85',
            amount: '117.85'
        },
        {
            title: 'თრომბოციტების გადასხმა',
            productName: '35%',
            entries: '154.85',
            amount: '101.85'
        },
        {
            title: 'თრომბოციტების გადასხმა',
            productName: '19%',
            entries: '185.85',
            amount: '112.85'
        }
    ] 

    useEffect(() => {
        const modifyData = data?.map((e)=> {
            return {...e, entries: e.entries[0].entryAmount}
        })
        setData(modifyData)
    }, [])

    useEffect(() => {
		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];

        setGenerateBreadcrumbs({
            categorie: categorie,
            parent: parent
        })

        getData(`${process.env.MEDICAL_API}/medical/products/get-products-by-contract-id?contractId=${router?.query?.contractId}`)
            .then((response)=> {
                setData(response);
            })
            .catch(err=> console.log(err))

        getData(`${process.env.MEDICAL_API}/medical/clinics/${router?.query?.id}`)
            .then((response)=> {
                setClinic(response)
            })
            .catch(err=> console.log(err))
    }, [router])
    
    return <>
        <Navigation />
        <div className={styles.servicesBlock}>
            <div className={styles.breadcrumbs}>
                <Breadcrumb
                    separator={<img src="/separator.svg" />}
                >
                    <Breadcrumb.Item>
                        <Link href="/">
                            <span className={styles.breadcrumbSpan}>მთავარი გვერდი</span>
                        </Link>
                    </Breadcrumb.Item>
                    {
                        (!generateBreadcrumbs?.parent && !generateBreadcrumbs?.categorie) &&
                        <Breadcrumb.Item>
                            <Link href={`/clinics`}>
                                <span className={styles.breadcrumbSpan}>კლინიკები</span>
                            </Link>
                        </Breadcrumb.Item>
                    }
                    {
                        generateBreadcrumbs?.parent && 
                        <Breadcrumb.Item>
                            <Link href={`/clinics?categoryId=${generateBreadcrumbs.parent.id}`}>
                                <span className={styles.breadcrumbSpan}>{generateBreadcrumbs.parent.title}</span>
                            </Link>
                        </Breadcrumb.Item>
                    }
                    <Breadcrumb.Item>
                        {
                            generateBreadcrumbs?.parent ? 
                            <Link href={`/clinics/?categoryId=${generateBreadcrumbs?.categorie?.id}&parentCategory=${generateBreadcrumbs?.parent?.id}`}>
                                <span className={styles.breadcrumbSpan}>{generateBreadcrumbs?.categorie?.title}</span>
                            </Link> : 
                            generateBreadcrumbs?.categorie &&
                            <Link href={`/clinics/?categoryId=${generateBreadcrumbs?.categorie?.id}`}>
                                <span className={styles.breadcrumbSpan}>{generateBreadcrumbs?.categorie?.title}</span>
                            </Link>
                        }
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> 
                        {
                            generateBreadcrumbs?.parent ? 
                            <Link href={`/clinicDetailPage/${router?.query?.id}/?categoryId=${generateBreadcrumbs?.categorie?.id}&parentCategory=${generateBreadcrumbs?.parent?.id}`}>
                                <span className={styles.breadcrumbSpan}>{clinic?.displayName}</span>
                            </Link>
                            :
                            <Link href={generateBreadcrumbs?.categorie?.id ? `/clinicDetailPage/${router?.query?.id}/?categoryId=${generateBreadcrumbs?.categorie?.id}` : `/clinicDetailPage/${router?.query?.id}/`}>
                                <span className={styles.breadcrumbSpan}>{clinic?.displayName}</span>
                            </Link>
                        }                  
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className={styles.activeBreadCrumb}>
                        მომსახურებები
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={styles.clincInfo}>
                <div className={styles.clinicImage}>
                    <Image src={clinic?.logoUrl} layout="fill" />
                </div>
                <div>
                    <h2>{clinic?.displayName}</h2>
                    <p>{clinic?.description}</p>
                </div>
            </div>
            <div className={styles.servicesSearch}>
                <h3>მომსახურებები</h3>
                <div className={styles.search}>
                    <input 
                        type="text" 
                        name="search" 
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder='მოძებნე მომსახურება' 
                    />
                    <ReactSVG src="/servicesSearchBtn.svg" className={styles.searchIcon} />
                </div>
            </div>
            <div className={styles.servicesTable}>
                {
                    dummyData?.length > 0 && 
                    <Table 
                        className={styles.table}
                        columns={columns}
                        data={dummyData}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        headerClassName={styles.tableHeader}
                        bodyClassName={styles.tableBody}
                        pagination={{ pageSize: 5, initialPage: 1 }}
                    />
                }
            </div>
        </div>
    </>
}
