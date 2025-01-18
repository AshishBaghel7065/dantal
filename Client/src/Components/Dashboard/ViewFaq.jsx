import { RiCloseLargeLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

function ViewFaq({ faq, onClose }) {
  const date = new Date(faq.dateofPost);

  // Extract the date and time separately
  const formattedDate = date.toLocaleDateString(); // Date in locale format
  const formattedTime = date.toLocaleTimeString(); // Time in locale format

  return (
    <div className="view-popup">
      <button onClick={onClose} className="close-btn">
        <RiCloseLargeLine />
      </button>
      <div className="viewpopup-content">
        <p className="fs-5 primary-color">FAQ Information</p>

        {/* FAQ Title Section */}
        <div className="row">
          <div className="col-lg-12 my-2">
            <div className="popup-header">
              <p>Question</p>
              <h5>{faq.question}</h5>
            </div>
          </div>
        </div>
        <div className="popup-header my-3">
          <p>Written by</p>
          <p>{faq.answerWrittenBy}</p>
        </div>

        <div className="popup-body my-3 ">
          <p>Answer</p>
          <div className="popup-description">{faq.answer} </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFaq;
