import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/components/tableWithSort.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

export default function Table({
    columns = [],
    data = [],
    pagination,
    rowClassName,
    cellClassName,
    headerClassName,
    bodyClassName,
    className,
    dropdownClassname = '',
    detailedUrl = ''
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [diplayedData, setDisplayedData] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdown, setDropdown] = useState([]);

    const [sorted, setSorted] = useState(false);

    const [isSort, setSort] = useState({});

    const getStartPage = () => {
        return (currentPage - 1) * (pagination.pageSize || 10) + 1;
    };

    const getEndPage = () => {
        return Math.min(currentPage * (pagination.pageSize || 10), data.length);
    };

    const dataCallback = useCallback((data) => {
        setDisplayedData(data);
    }, [data])

    const selectPage = (selectedOption) => {
        setCurrentPage(selectedOption.value);
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        if (!pagination) return dataCallback(data);
        setSelectedOption(options[currentPage - 1]);
        setOptions(
            Array.from(
                Array(
                    Math.ceil(data.length / (pagination.pageSize || 10))
                ).keys()
            ).map((i) => ({ value: i + 1, label: i + 1 }))
        );
        dataCallback(
            data.slice(
                (currentPage - 1) * (pagination.pageSize || 10),
                currentPage * (pagination.pageSize || 10)
            )
        );
    }, [currentPage, data]);

    useEffect(() => {
        const getDataKeys = data?.map((item, i) => ({
            key: i,
            dropdown: false,
        }))
        setDropdown(getDataKeys)
    }, [])

    const sortData = useCallback((value) => {
        console.log(diplayedData, !isSort[value])
        if (!isSort[value]) {
            const sort = diplayedData?.sort((a, b) => a[value] === b[value] ? 0 : a[value] < b[value] ? -1 : 1)
            setDisplayedData(sort)
            setSorted(!sort)
        } else {
            const sort = diplayedData?.sort((a, b) => b[value] === a[value] ? 0 : b.name < a[value] ? -1 : 1)
            setDisplayedData(diplayedData.reverse())
            setSorted(!sort)
        }
    }, [isSort, diplayedData])

    const tableHeader = (
        <div
            className={styles.headerBack}
            onScroll={(event) => {
                const target = event.target;
                const header = target.parentNode.querySelector(
                    `.${styles.tableBody}`
                );
                if (target.scrollLeft !== header.scrollLeft)
                    header.scrollTo(target.scrollLeft, 0);
            }}
        >
            <div
                className={classNames(
                    styles.tableHeader,
                    styles.tableRowTemplate,
                    rowClassName,
                    headerClassName
                )}
            >
                {columns?.map(({ key, title, headerStyle, dataIndex, sort }) => {
                    const [sorted, setSorted] = useState(false);

                    if (dataIndex !== 'hidden') {
                        return (
                            <div
                                className={`${styles.tableHeaderCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                style={headerStyle ? headerStyle : null}
                                key={key}
                            >
                                {title}
                                {
                                    sort && <>
                                        <button
                                            className={styles.sortIcons}
                                            onClick={() => {
                                                setSorted(!sorted);
                                                setSort((prevState) => ({ ...prevState, [dataIndex]: !sorted }));
                                                sortData(dataIndex)
                                            }
                                            }
                                        >
                                            <ReactSVG src="/sortArrow.svg" className={sorted? styles.sort : styles.sorted} alt="" />
                                        </button>
                                    </>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );

    const dropdownFunc = (index) => {
        setDropdown((prevState) => {
            const setNewData = prevState.map((item) => {
                if (item.key === index) {
                    return { ...item, dropdown: !item.dropdown }
                } else {
                    return { ...item, dropdown: false }
                }
            })
            return setNewData
        })
    }

    return (
        <div className={classNames(styles.table, className)}>
            {tableHeader}
            <div
                className={classNames(styles.tableBody, bodyClassName)}
                onScroll={(event) => {
                    const target = event.target;
                    const header = target.parentNode.querySelector(
                        `.${styles.headerBack}`
                    );
                    if (target.scrollLeft !== header.scrollLeft)
                        header.scrollTo(target.scrollLeft, 0);
                }}
            >
                {diplayedData.map((record, index) => {
                    return (
                        <>
                            <div
                                className={classNames(styles.column, {
                                    [styles.columnOpen]: dropdown[index].dropdown,
                                })}
                            >
                                <div>
                                    <TableRow
                                        columnsDefinition={columns}
                                        record={record}
                                        key={`table-row-${index}`}
                                        rowClassName={rowClassName}
                                        cellClassName={cellClassName}
                                        dropDown={() => dropdownFunc(index)}
                                        detailedUrl={detailedUrl}
                                    />
                                </div>
                                <div className={classNames(styles.dropdown, dropdownClassname,
                                    {
                                        [styles.statusOpen]: dropdown[index].dropdown,
                                        [styles.statusClosed]: !dropdown[index].dropdown,
                                    }
                                )}
                                >
                                    {
                                        columns?.map((item, i) => {
                                            if (item.dataIndex === 'hidden') {
                                                return <>
                                                    <div className={styles.dropdownCol}>
                                                        <h2>{item.title}</h2>
                                                        <span>{record[item.key]}</span>
                                                    </div>
                                                </>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
            {pagination ? (
                <div className={styles.pagination}>
                </div>
            ) : null}
        </div>
    );
}

const TableRow = ({
    record,
    columnsDefinition,
    rowClassName,
    cellClassName,
    dropDown,
    detailedUrl
}) => {
    return (
        <div
            className={classNames(
                styles.tableRow,
                styles.tableRowTemplate,
                rowClassName
            )}
        >
            {columnsDefinition.map(
                ({ dataIndex, render, cellStyle }, index) => {
                    let colLenght = columnsDefinition.filter(e => e.dataIndex !== 'hidden').length;
                    if (render) {
                        return <>
                            {
                                index === 0 ?
                                    <div onClick={() => dropDown()}>
                                        {
                                            render(
                                                record[dataIndex],
                                                `data-${record.key}-${index}`,
                                            )
                                        }
                                    </div>
                                    :
                                    (index !== colLenght - 1) ?
                                        <Link href={detailedUrl}>
                                            {render(
                                                record[dataIndex],
                                                `data-${record.key}-${index}`,
                                            )}
                                        </Link> :
                                        render(
                                            record[dataIndex],
                                            `data-${record.key}-${index}`,
                                        )
                            }
                        </>
                    }
                    if (dataIndex !== 'hidden') {
                        return <>
                            {
                                index === 0 ?
                                    <div
                                        className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                        key={`data-${record.key}-${index}`}
                                        style={cellStyle ? cellStyle : null}
                                        onClick={() => dropDown()}
                                    >
                                        {record[dataIndex]}
                                    </div>
                                    :
                                    <Link href={detailedUrl}>
                                        <div
                                            className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                            key={`data-${record.key}-${index}`}
                                            style={cellStyle ? cellStyle : null}
                                        >
                                            {record[dataIndex]}
                                        </div>
                                    </Link>
                            }
                        </>
                    }
                }
            )}
        </div>
    );
};
