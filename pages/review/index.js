import {useState} from 'react';
import { ReactSVG } from 'react-svg';
import ReactStars from 'react-stars'
import Button from "../../components/ui/Button";
import styles from '../../styles/pages/review.module.css';

export default function ReviewPage() {
    const [step, setStep] = useState(1);
    
    return <>
        <div className={styles.reviewPage}>
            {
                step == 1 && <>
                    <div className={styles.reviewHeader}>
                        <div>
                            <h3>Add Review</h3>
                            <h4>How did we do ?</h4>
                        </div>
                        <ReactSVG src="/closeIcon.svg" />
                    </div>
                    <div className={styles.reviewRating}>
                        <ReactStars
                            className={styles.ratings}
                            count={5}
                            size={24}
                            color2={'#ffd700'} 
                        />
                    </div>
                    <div className={styles.reviewFeedback}>
                        <h4>Tell us about your experience</h4>
                        <textarea className={styles.feedbackTextarea} placeholder="Write your feedback ..."></textarea>
                    </div>
                    <div className={styles.sendFeedback}>
                        <Button 
                            name="Send feedback" 
                            style={styles.feedbackBtn} 
                            onClick={()=> setStep(2)}
                        />
                    </div>
                </>
            }
            {
                step == 2 && <>
                    <div className={styles.reviewSuccess}>
                        <div>
                            <ReactSVG src="/success.svg" />
                        </div>
                        <h3>Thank  you !</h3>
                        <h4>By making your voice heard , you help us to improve Medical</h4>
                        <Button 
                            name="Close" 
                            style={styles.feedbackBtn} 
                        />
                    </div>
                </>
            }
        </div>
    </>
}