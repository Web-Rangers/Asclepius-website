import Text from '../ui/Text';
import Link from 'next/link';
import { useState } from 'react';
import { LazyLoadImage, trackWindowScroll }
from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import classNames from 'classnames';
import classes from '../../styles/homePage.module.css';
import * as ANT from 'antd';

const DoctorCardItem = ({ id, ...props }) => {
	const [state, setState] = useState(false);

	return <>
		{!state && 
			<DoctorsSkeleton customStyle={classes.doctorSkelton} />
		}
		<Link href={`/doctors/${id}`}>
			<div
				className={classNames(classes.doctorItemContainer, {
					[classes.appendDoc]: state
				})}
				key={props.id}
			>
				<div className={classes.doctorPhotoContainer}>
					<LazyLoadImage
						key={props.id}
						alt={props.title}
						effect={'blur'}
						// height={'286px'}
						src={
							props.src === 'https://s3.pirveli.com/v1/api/getFile?id=null'
								? '/Profile.svg'
								: props.src
						}
						width={state ? '313px' : '0px'}  
						beforeLoad={()=> console.log('before')}
						afterLoad={()=> setState(true)}
					/>
				</div>
				<div className={classes.contentContainer}>
					<Text style={classes.doctorNameText}>{props.doctorName}</Text>
					<Text style={classes.doctorSpecialityText}>{props.speciality}</Text>
				</div>
			</div>
		</Link>
	</>;
};

export default DoctorCardItem;

export function DoctorsSkeleton({customStyle}) {
    return <>
        <div className={classNames(classes.docskeleton, customStyle)}>
            <div className={classes.docskeltonImage}>
                <img src="/skeleton-gif.gif" alt="" />
            </div>
            <div className={classes.docskeltonTitles}>
                <ANT.Skeleton.Input size={20} active />
                <ANT.Skeleton.Input size={15} active />
            </div>

        </div>
    </>
}
