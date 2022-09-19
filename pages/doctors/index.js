import { useState, useMemo } from "react";
import styles from "../../styles/pages/doctors.module.css";
import Button from "../../components/ui/Button";
import FilterModal from "../../components/modals/filterModal";
import classNames from "classnames";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Pagination from "../../components/ui/Pagination";
import Image from "next/image";

const doctorsArray = [
  {
    id: 1,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Union Family Health Center",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "1.9",
    clinicPhoneNumber: "+99557799700",
    clinicEmail: "atcare@optimo.com",
  },
  {
    id: 2,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 3,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 4,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },

  {
    id: 5,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Union Family Health Center",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 6,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Healing Helpers Medical Group",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 7,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingDay: "Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 8,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 9,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
  {
    id: 10,
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Healing Helpers Medical Group",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    clinicPhoneNumber: "+995577997799",
    clinicEmail: "atcare@gmail.com",
  },
];

export default function Doctors() {
  const [isOpen, setOpen] = useState();
  const [status, setStatus] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let PageSize = 4;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return doctorsArray.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage]);

  return (
    <>
      {isOpen && (
        <FilterModal onClose={() => setOpen(false)}>
          <div
            className={classNames(styles.filterContainer, {
              [styles.filterOpen]: isOpen,
            })}
          >
            <div className={styles.filterSelectors}>
              <Select
                label="Doctor name"
                labelStyle="outside"
                className={styles.servInput}
                options={[
                  {
                    label: "4140 Parker Rd",
                    value: "1",
                  },
                  { label: "Another Branch", value: "2" },
                ]}
                onChange={(value) => {
                  setStatus(value);
                }}
              />
              <Select
                label="Service name"
                labelStyle="outside"
                className={styles.servInput}
                options={[
                  {
                    label: "4140 Parker Rd",
                    value: "1",
                  },
                  { label: "Another Branch", value: "2" },
                ]}
                onChange={(value) => {
                  setStatus(value);
                }}
              />
              <div className={styles.selects}>
                <h2>Card</h2>
                <div>
                  <button
                    className={classNames(styles.selectBtn, {
                      [styles.activeBtn]: serviceType === "online",
                    })}
                    onClick={() => setServiceType("online")}
                  >
                    Online
                  </button>
                  <button
                    className={classNames(styles.selectBtn, {
                      [styles.activeBtn]: serviceType === "at_home",
                    })}
                    onClick={() => setServiceType("at_home")}
                  >
                    At home
                  </button>
                  <button
                    className={classNames(styles.selectBtn, {
                      [styles.activeBtn]: serviceType === "clinic",
                    })}
                    onClick={() => setServiceType("clinic")}
                  >
                    Clinic
                  </button>
                </div>
              </div>
              <Input label="Service price" className={styles.servInput} />
              <Input label="Service status" className={styles.servInput} />
              <Input label="Service review" className={styles.servInput} />
            </div>
            <div className={styles.filterBtns}>
              <Button name="Clear" style={styles.clearBtn} />
              <Button name="Filter" style={styles.filterBtn} />
            </div>
          </div>
        </FilterModal>
      )}
      <div className={styles.doctorsPage}>
        <div className={styles.doctorsContainer}>
          <div className={styles.back}>
            <Image layout="fill" src="/backBtn.svg" alt="" />
          </div>
          <div className={styles.doctorslistContainer}>
            <h2>Experienced doctors</h2>
            <Button
              name={
                <div>
                  <Image layout="fill" src="/filter.svg" alt="" />
                  <span>Filter</span>
                </div>
              }
              style={styles.filterButton}
              onClick={() => setOpen(true)}
            />
            <div
              className={styles.filterForMobile}
              onClick={() => setOpen(true)}
            >
              <Image layout="fill" src="/filter.svg" alt="" />
            </div>
          </div>

          <div className={styles.doctorsList}>
            {currentTableData.map((doctor) => {
              return (
                <div className={styles.doctor} key={doctor.id}>
                  <div className={styles.poster}>
                    <div className={styles.doctorStar}>
                      <Image layout="fill" src="/whiteStar.svg" alt="" />
                      <span>4.9</span>
                    </div>
                    <Image layout="fill"
                      className={styles.doctorImage}
                      src="/doctor10.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.doctorContact}>
                    <div className={styles.contact}>
                      <Image layout="fill"
                        className={styles.video}
                        src="/videoIcon.svg"
                        alt=""
                      />
                    </div>
                    <div className={styles.contact}>
                      <Image layout="fill"
                        className={styles.phone}
                        src="/phoneContact.svg"
                        alt=""
                      />
                    </div>
                    <div className={styles.contact}>
                      <Image layout="fill" className={styles.home} src="/home.svg" alt="" />
                    </div>
                  </div>
                  <div className={styles.doctorInfo}>
                    <div className={styles.doctorName}>
                      <h2>Pamela Martínez</h2>
                      <span className={classNames(styles.doctorStatus)}></span>
                    </div>
                    <div className={styles.proffesion}>
                      <div className={styles.prof}>Therapist</div>
                      <div className={styles.prof}>Family doctor</div>
                    </div>
                    <div className={styles.address}>
                      <Image layout="fill" src="/doctorLocation.svg" alt="" />
                      <h4>Carymouth , Hallmark Clinic</h4>
                    </div>
                    <div className={styles.language}>
                      <span className={styles.languageTitle}>Language</span>
                      <div className={styles.languageList}>
                        <span>Geo</span>
                        <span>Eng</span>
                        <span>Rus</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.pagination}>
            <Pagination
              className={styles.pagination}
              currentPage={currentPage}
              totalCount={doctorsArray.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
