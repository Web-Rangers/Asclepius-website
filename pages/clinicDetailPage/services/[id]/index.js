import {useState, useEffect} from 'react';
import { getData } from '../../../../components/request';
import styles from '../../../../styles/pages/services.module.css';
import Table from '../../../../components/TableWithSort';
import { ReactSVG } from 'react-svg';

export default function Services({services}) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const columns = [
        {
            key: "title",
            title: "მომსახურების სახელი",
            dataIndex: "title",
            sort: true,
        },
        {
            key: "productName",
            title: "ფასდაკლება ( % )",
            dataIndex: "productName",
        },
        {
            key: "entries",
            title: "არსებული ფასი",
            dataIndex: "entries",
        },
        {
            key: "amount",
            title: "შემოთავაზებული ფასი",
            dataIndex: "amount",
        }
    ];

    useEffect(() => {
        const modifyData = services?.map((e)=> {
            return {...e, entries: e.entries[0].entryAmount}
        })
        setData(modifyData)
    }, [])
    

    return <>
        <div className={styles.servicesBlock}>
            <div className={styles.servicesSearch}>
                <div className={styles.search}>
                    <input 
                        type="text" 
                        name="search" 
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder='ძებნა' 
                    />
                    <ReactSVG src="/Search.svg" className={styles.searchIcon} />
                </div>
            </div>
            <div className={styles.servicesTable}>
                {
                    data?.length > 0 && 
                    <Table 
                        className={styles.table}
                        columns={columns}
                        data={data}
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

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const id = params.id;

    const services = await getData(
		`https://medical.pirveli.ge/medical/products/get-products-by-contract-id?contractId=${id}`
	);

    return {
        props: {
            services: services
        }
    }
}
