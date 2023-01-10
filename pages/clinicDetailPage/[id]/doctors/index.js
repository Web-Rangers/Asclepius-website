import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb, Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { getData } from '../../../../components/request';
import Navigation from '../../../../components/navigation';
import styles from '../../../../styles/pages/clinicDocs.module.css';

export default function ClinicDoctors() {
    const router = useRouter();
	const categories = useSelector((state)=> state.categories.categories);
    const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
    const [clinic, setClinic] = useState({});

    const [doctorsList, setDoctorsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalDocNumbers, setTotalDocNumbers] = useState(1);
    const [loadings, setLoadings] = useState([]);
    let size = 4;

	useEffect(() => {
		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];

        setGenerateBreadcrumbs({
            categorie: categorie,
            parent: parent
        })

        getData(`${process.env.MEDICAL_API}/medical/clinics/${router?.query?.id}`)
            .then((response)=> {
                setClinic(response)
            })
            .catch(err=> console.log(err))
    }, [router])

    useEffect(()=> {
        //doctors list
        getDoctorsData()
    },[clinic?.id])

    const getDoctorsData = useCallback(()=> {
        if(clinic?.id !== undefined && currentPage < totalDocNumbers){
            //start loading
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[1] = true;
                return newLoadings;
            });

            getData(`https://asclepius.pirveli.com/asclepius/v1/api/clinics/${clinic?.id}/doctors?page=${currentPage}&size=${size}`)
            .then((res)=> {
                setCurrentPage(res?.pageable?.pageNumber + 1);
                setTotalDocNumbers(res?.totalPages)
                setDoctorsList((prev)=> ([...prev, ...res?.content]))
            })
            .finally(()=> {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[1] = false;
                    return newLoadings;
                });
            })
        }
    },[clinic?.id, currentPage])

    return <>
        <Navigation />
        <div className={styles.doctorsContainer}>
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
                            <Link href={`/clinicDetailPage/${clinic?.id}/?categoryId=${generateBreadcrumbs?.categorie?.id}&parentCategory=${generateBreadcrumbs?.parent?.id}`}>
                                <span className={styles.breadcrumbSpan}>{clinic?.displayName}</span>
                            </Link>
                            :
                            <Link href={generateBreadcrumbs?.categorie?.id ? `/clinicDetailPage/${clinic?.id}/?categoryId=${generateBreadcrumbs?.categorie?.id}` : `/clinicDetailPage/${clinic?.id}/`}>
                                <span className={styles.breadcrumbSpan}>{clinic?.displayName}</span>
                            </Link>
                        }                  
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className={styles.activeBreadCrumb}>
                        ექიმები
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={styles.clincInfo}>
                <div className={styles.clinicImage}>
                    <Image src={clinic?.logoUrl} layout="fill" />
                </div>
                <h2>{clinic?.displayName}</h2>
            </div>
            <div className={styles.clinicContent}>
                <h2 className={styles.clinicDocHeader}>ექიმები</h2>
                <div className={styles.doctorsList}>
                    {
                        doctorsList?.map((doc, i)=> {
                            return <div className={styles.doctorsView} key={i}>
                                <div className={styles.doctorImage}>
                                    <Image layout='fill' src={doc?.pictureUrl} />
                                </div>
                                <div className={styles.doctorInfo}>
                                    <h2>{doc?.firstName} {doc?.lastName}</h2>
                                    <div className={styles.proffesions}>
                                        {
                                            doc?.professions?.map((docProffesion, profKey)=>{
                                                return <h4 key={profKey}>{docProffesion?.name}</h4>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                {
                    (clinic?.id !== undefined && currentPage < totalDocNumbers) && 
                    <Button
                        className={styles.loadmoreBtn}
                        type="primary"
                        loading={loadings[1]}
                        onClick={() => getDoctorsData()}
                    >
                        მეტი
                    </Button>
                }
            </div>
        </div>
    </>
}