import { useState, useMemo } from "react";
import ClinicPageCardItem from "./ClinicPageCardItem";
import s from "../../styles/clinicsPage.module.css";
import Link from "next/link";
import Text from "../ui/Text";
import Button from "../ui/Button";
import Image from "next/image";
import Pagination from "../ui/Pagination";
import Modal from "react-modal";

const clinciArray = [
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Union Family Health Center",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },

  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Union Family Health Center",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Healing Helpers Medical Group",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingDay: "Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Carymouth , Hallmark Clinic",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Progress Medical Clinic",
    workingday: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "/clinicImage.png",
    alt: "clinic image",
    clinicName: "Healing Helpers Medical Group",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
];

let PageSize = 3;

const customStyles = {
  content: {
    width: "30%",
    height: "100%",
    top: "50%",
    left: "88%",
    right: "10px",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "#ffffff",
  },
  overlay: {
    background: "transparent",
  },
};

const ClinicPageCardList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return clinciArray.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div>
        <Link href="/homePage">
          <a className={s.backButton}>
            <Image
              alt="Arrow-LeftActive"
              src="/Arrow - LeftActive.svg"
              width="24px"
              height="24px"
              style={{ paddingRight: "4px" }}
            />
            Back
          </a>
        </Link>
      </div>
      <div className={s.clinicFilterContainer}>
        <Text style={s.clinicsTitleTextStyle}>Clinics</Text>
        <Button
          style={s.filterButtonStyle}
          name="Filter"
          icon={
            <Image
              alt="Arrow-LeftActive"
              src="/Filter.svg"
              width="24px"
              height="24px"
            />
          }
          onClick={openModal}
        ></Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={s.headerContainer}>
            <Text style={s.filterTitleStyle}>Filter</Text>
            <Image
              alt="closeIcon"
              src="/closeIcon.svg"
              width="30px"
              height="30px"
              onClick={closeModal}
            />
          </div>
          <div className={s.searchInput}>
            <Image src="/Search.svg" alt="Search" width="20px" height="20px" />
            <input
              type="search"
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
            />
          </div>
          <div className={s.dropDownFilterContainer}>
            <Text style={s.filterInputTitle}>City</Text>
            <form>
              <select className={s.inputStyle}>
                <option value="Tbilisi">Tbilisi</option>
                <option value="London">London</option>
                <option selected value="City">
                  City
                </option>
              </select>
            </form>

            <Text style={s.filterInputTitle}>Service type</Text>
            <form>
              <select className={s.inputStyle}>
                <option value="Clinic">Clinic</option>
                <option value="laboratory">laboratory</option>
                <option selected value="City">
                  Service type
                </option>
              </select>
            </form>
          </div>
          <div className={s.buttonContainer}>
            <Button name="Clear" style={s.clearButton} />
            <Button name="Filter" style={s.filterButton} />
          </div>
        </Modal>
      </div>
      <div className={s.clinicPageCardListContainer}>
        {currentTableData.map((item, index) => (
          <ClinicPageCardItem
            key={index}
            alt={item.alt}
            clinicName={item.clinicName}
            workingDay={item.workingDay}
            workingHours={item.workingHours}
            clinicAddress={item.clinicAddress}
            rating={item.rating}
          />
        ))}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={clinciArray.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ClinicPageCardList;
