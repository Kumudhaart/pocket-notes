import Style from "./RightSidePannel.module.css";

const RightSidePannel = () => {
  return (
    <>
      <div className={Style.rightSidePannel}>
        <div className={Style.image}>
          <img
            src="assets/notes.png"
            alt="image"
            style={{ width: "50vw" }}
          />
          <div>
            <div className={Style.imageText1}>Pocket Notes</div>
            <div className={Style.imageText2}>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </div>
          </div>
          <div className={Style.endToEnd}><img src="assets/lock.png" alt="endToEndEncrypted"/> end-to-end encrypted</div>
        </div>
          </div>
    </>
  );
};

export default RightSidePannel;