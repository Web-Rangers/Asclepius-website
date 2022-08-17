import styles from '../../styles/components/modals/filterModal.module.css';

export default function FilterModal({
    onClose,
    children
}) {
    return <>
        <div className={styles.filterModal}
            onClick={()=> onClose()}
        >
        </div>
        <div className={styles.filterContainer}>
            <div className={styles.filterTool}>    
                <h2>Filter</h2>
                <img src="/closeFilter.svg" onClick={()=> onClose()} alt="" />
            </div>
            {children}
        </div>
    </>
}