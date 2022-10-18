import {useState} from 'react';
import styles from '../../styles/pages/faq.module.css';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

export default function Faq() {
    const [selectTopic, setSelectTopic] = useState(null);

    const topics = [
        {
            id: 0,
            title: 'What is Medical?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        },{
            id: 1,
            title: 'How are digital signatures verified?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        },{
            id: 2,
            title: 'What is identity verification?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        },{
            id: 3,
            title: 'What will my  subscription cost?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        },{
            id: 4,
            title: 'What does the Biometric Liveness Detection mean?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        },{
            id: 5,
            title: 'Can I trial a product for free before purchasing it?',
            description: "Medical is a software that provides identification and verification of a person. The process consists of two stages, the first is the identification and the second is verification. In the first stage, the person takes a selfie. Then the program asks to the person to bring the face close to the camera (at this time the movement of biometric data is taken) and the process ends automatically. If the system does not detect suspicious action by the user, the process continues at the verification stage. At this stage"
        }
    ]

    return <>
        <div className={styles.faqPage}>
            <div className={styles.faqHeader}>
                <h3>FAQ</h3>
                <h4>Here is a list of the most common customer questions. 
                    If you cant find an answer to your question, please 
                    dont hesitate to reach out to us.
                </h4>
            </div>
            <div className={styles.faqCats}>
                <div className={styles.faqCat}>
                    <ReactSVG src="/wtmedical.svg" />
                    What is Medical
                </div>
                <div className={styles.faqCat}>
                    <ReactSVG src="/services.svg" />
                    Services
                </div>
                <div className={styles.faqCat}>
                    <ReactSVG src="/transactions.svg" />
                    Transactions
                </div>
                <div className={styles.faqCat}>
                    <ReactSVG src="/transactions2.svg" />
                    Transactions
                </div>
            </div>
            <div className={styles.topics}>
                {
                    topics?.map((topic, i)=>{
                        return <>
                            <div 
                                key={i}
                                className={classNames(styles.topic, {
                                    [styles.activeTopic]: topic.id === selectTopic
                                })}
                                onClick={()=> {
                                    if(topic.id !== selectTopic) setSelectTopic(topic.id)
                                    else setSelectTopic(null)
                                }}
                            >   
                                <div className={styles.topicTitle}>
                                    <h2>{topic.title}</h2>
                                    <ReactSVG src="/topicarrow.svg" className={classNames({
                                        [styles.rotateArrow]: topic.id === selectTopic
                                    })} />
                                </div>
                                <div className={classNames(styles.topicDescription, {
                                    [styles.activeDescription]: topic.id === selectTopic
                                })}>
                                    {topic.description}
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    </>
}