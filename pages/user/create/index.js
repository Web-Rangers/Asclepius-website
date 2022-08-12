import styles from '../../../styles/pages/userDetailed.module.css';
import Button from '../../../components/ui/Button';
import Block from '../../../components/block';

export default function UserDetailed() {
    const memberList = [
        {
            id:1,
            name: 'Martha Fowler',
            email: 'marthafowler@gmai.com',
            age: 'Under 18',
            image: '/avatar1.png',
        },
        {
            id:2,
            name: 'George Fowler',
            email: 'georgefowler@gmail.com',
            age: 'Above 18',
            image: '/avatar2.png',
        },
    ]

    return <>
        <div className={styles.detailedPage}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <div>
                        <h2>Hello <span>Mary Fowler</span></h2>
                        <p>Have a nice day and don’t forger to take care of your health !</p>
                        <Button 
                            style={styles.greetingBtn} 
                            name='Read more'
                        />
                    </div>
                    <div>
                        <img 
                            className={styles.greetingBackground} 
                            src="/greetingBg.png" 
                            alt="greeting" 
                        />
                    </div>
                </div>
            </div>
            <div className={styles.rightMenu}>
                <Block
                    title="My card"
                    actions={<button className={styles.upgradeBtn}>Upgrade</button>}
                >
                    <img className={styles.cardImage} src="/card.png" alt="" />
                </Block>

                <Block
                    title="Family member"
                    actions={
                        memberList.length > 0 && 
                        <button className={styles.addFamilyMember}>
                            <img src="/plus.svg" alt="" />
                            <span>ADD</span>
                        </button>
                    }
                    className={styles.familyBlock}
                >
                    {
                        memberList?.length > 0 ?
                        <div className={styles.membersList}>
                            {memberList?.map((member)=>{
                                return <>
                                    <div className={styles.familyMember}>
                                        <div className={styles.memberInfo}>
                                            <img src={member.image} alt="" />
                                            <div>
                                                <h2>{member.name}</h2>
                                                <h3>{member.email}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                member.age === 'Under 18' ? 
                                                <img src="/eye.svg" alt="" />
                                                :
                                                <img src="/disabledEye.svg" alt="" />
                                            }
                                        </div>
                                    </div>
                                </>
                            })}
                        </div> 
                             : 
                        <div className={styles.membersBlock}>
                            <img src="/users.svg" alt="" />
                            <h2>Family members are not added</h2>
                            <Button 
                                style={styles.membersAdd}
                                name={
                                    <div className={styles.memberAddBtn}>
                                        <img src="/memberPlus.svg" alt=""/>
                                        <span>Add</span>
                                    </div>
                                }
                            />
                        </div>
                    }
                </Block>
            </div>
        </div>
    </>
}
