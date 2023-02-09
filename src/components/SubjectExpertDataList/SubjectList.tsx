import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  axiosClient,
  getSubjectwiseQuiz,
  getSubjectwiseQuizAnswers,
} from "../../api/apiAgent";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import ReactModal from "react-modal";
import SubjectInfo from "../../Interface/SubjectInfo";
const SubjectList = () => {
  const [subjectList, setSubjectList] = useState<any>([]);
  const [OpenTestModal, setOpenTestModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [subjectAnswersList, setSubjectAnswerList] = useState<any>([]);
  //const [quizSubjectInfo, setquizSubjectInfo] = useState<SubjectInfo>({setNumber: 0, subjectName: ''});
  const [quizSubjectInfo, setquizSubjectInfo] = useState<SubjectInfo>({
    setNumber: 0,
    subjectName: "",
  });
  const handleClose = () => {
    setOpenDialog(false);
  };

  const startTestViewButtonHandler = (e: any) => {
    console.log("value of subjectdata on onclick view is", e);
    // axiosClient
    //   .get(
    //     `quiz/SubjectExpert/questions?set=${subjectData.setNumber}&subject=${subjectData.subjectName}`
    //   )
    // setOpenTestModal(true);
    // getSubjectwiseQuizAnswers(subjectData.setNumber, subjectData.subjectName)
    //   .then((res) => {
    //     console.log("respo in subj is", res.data);
    //     setSubjectAnswerList(res.data);
    //   })
    //   .then((data) => console.log("sucesss"))
    //   .catch((error) => console.log("error in api view"));

    //setquizSubjectInfo((quizSubjectInfo) => (quizSubjectInfo.subjectname = "Mark"));
    //setquizSubjectInfo((quizSubjectInfo) => ({...quizSubjectInfo,setnumber : 1}));
    //setquizSubjectInfo((quizSubjectInfo) => Object.assign({}, quizSubjectInfo, { setnumber:e.setNumber }));
    // setModalContent("listView");
    // setOpenTestModal(true);
    // quizSubjectInfo.subjectName = e.subjectName;
    // quizSubjectInfo.setNumber = e.setNumber;
    // quizSubjectInfo.subjectName = e.subjectName;
    // var set = e.setNumber;
    // var subject = e.subjectName;
    //setquizSubjectInfo(quizSubjectInfo =>({...quizSubjectInfo,[setnumber]:test1,subjectname: test2}));
    //const setnumber = e.target.setNumber;
    //const value = e.target.value;
    //setquizSubjectInfo({ ...quizSubjectInfo, setnumber: e.target.setNumber })
    //setquizSubjectInfo({ ...quizSubjectInfo, subjectname:e.target.SubjectName })
    // setquizSubjectInfo({ setNumber: e.setNumber, subjectName: e.subjectName });
    getSubjectwiseQuizAnswers(e.setNumber, e.subjectName)
      .then((response) => {
        setSubjectAnswerList(response.data);
        //const data=subjectAnswersList;
        console.log("resp data is", response.data);
      })
      .catch((error: any) => console.log("error in subjwise answersapi"));
    // var data1 = subjectAnswersList;
    // setModalContent("listView");
    // setOpenTestModal(true);
  };
  console.log("Subject info details", quizSubjectInfo);
  var data = quizSubjectInfo;
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const handleCloseFromModal = () => {
    setOpenTestModal(false);
  };
  const subjectwiseQuizDetails = async () => {
    getSubjectwiseQuiz("")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error: any) => console.log("error in subjwiseapi"));
  };
  useEffect(() => {
    subjectwiseQuizDetails();
  }, []);

  console.log("value of answerlist is", subjectAnswersList);
  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
        <Box>
          <Grid container spacing={1} alignItems="flex-start">
            {subjectList &&
              subjectList.map((elem: any, index: any) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card style={{ width: "100%" }}>
                    <Typography
                      variant="h6"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ padding: 20 }}
                    >
                      {elem.subjectName}
                      <Button
                        variant="contained"
                        onClick={() => startTestViewButtonHandler(elem)}
                      >
                        View
                      </Button>
                    </Typography>
                    <CardContent>
                      <Typography>
                        <strong>
                          {`Set : ${elem.setNumber}`} &nbsp; &nbsp;
                          {`Total Questions : ${elem.totalQuestionsCount}`}
                        </strong>
                      </Typography>
                      <Typography>
                        {`Created By : ${
                          elem.createdBy == null ? "Test User" : elem.createdBy
                        }`}
                        <br />
                        {`Updated By : ${
                          elem.updatedBy == null ? "Test User" : elem.updatedBy
                        }`}
                        <br />
                        {`Created Date : ${elem.createdDate}`}
                        <br />
                        {`Updated Date : ${elem.updatedDate}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        <div className="quiz-start-btn-wrap">
          <ReactModal
            isOpen={OpenTestModal}
            contentLabel="Minimal Modal Example"
            ariaHideApp={false}
          >
            <h1>keeek</h1>
            {/* {modalContent && modalContent === "listView" ? (
              <AllQuestionsAnswers
                openDialog={openDialog}
                handleClose={handleClose}
                setOpenDialog={setOpenDialog}
                quizSubjectInfo={quizSubjectInfo}
              />
            ) : null} */}
          </ReactModal>
        </div>
      </Box>
    </>
  );
};

export default SubjectList;
