import styles from '../../styles/components/modals/filterModal.module.css';
import Image from "next/image";

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
                <Image layout="fill" src="/closeFilter.svg" onClick={()=> onClose()} alt="" />
            </div>
            {children}
        </div>
    </>
}