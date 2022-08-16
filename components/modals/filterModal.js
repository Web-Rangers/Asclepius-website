import styles from '../../styles/components/modals/filterModal.module.css';

export default function FilterModal({
    children
}) {
    return <>
        <div className={styles.filterModal}>
            <div className={styles.filterContainer}>
                <div className={styles.filterTool}>    
                    <h2>Filter</h2>
                    <img src="/closeFilter.svg" alt="" />
                </div>
                {children}
            </div>
        </div>
    </>
}