import styles from "../styles/modal.module.css";

interface Props {
  closeModal: Function;
  image: string;
}

const Modal = ({ closeModal, image }: Props) => {
  const func = () => {
    closeModal();
  };
  return (
    <div onClick={func} className={styles.background}>
      <img src={image} className={styles.modalcontent} />
    </div>
  );
};

export default Modal;
