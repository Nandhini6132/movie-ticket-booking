import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MovieTicketPdf = (props) => {
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );
 
 const length= showDetailsSelector.length
 const slicedArray = showDetailsSelector.slice(length-1, length);
  const movieName = useSelector(
    (state) => state.allMovie.movieDetail.original_title
  );
  const [showModal, setShowModal] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);
  const modalElement = componentRef.current;
  const handleDownload = async () => {
    if (!modalElement) return;

    // Capture the modal content as a canvas
    const canvas = await html2canvas(modalElement);
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4'); // Adjust the size as needed

    // Add the canvas image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0);

    // Save the PDF
    pdf.save('modal_content.pdf');
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        ref={componentRef}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png"
              alt=""
              height={75}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Row>
              <Col>
                Booking Id: <strong>89898</strong>
              </Col>
              <Col style={{ textAlign: "end" }}>May 7, 2024</Col>
            </Row>
            <Row>
              <Col>Paytm order id: 7878789565</Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Typography variant="body1">{movieName}</Typography>
              </Col>
              <Col style={{ textAlign: "end" }}>
                {slicedArray.map(a=>a.time)}
              </Col>
            </Row>

            <Row className="mt-2">
              <Col className="mt-3">
                {" "}
                <Typography variant="body1">
                  {" "}
                  <strong>Colan Cinemas</strong> <br />
                  <small>
                    Near colan infotech,near SBI, Ashraf street, Pernambut,
                    Vellore. <br /> ph:0444 284 4666 / 7827667667
                  </small>
                </Typography>
                <Stack direction="row" mt={1} spacing={1}>
                  {slicedArray.map(a=>a.comb)?.map((seat) => (
                    <Box fontWeight={600}>{seat}</Box>
                  ))}
                </Stack>
              </Col>

              <Col style={{ textAlign: "end" }}>
                <img
                  src={`https:api.qrserver.com/v1/create-qr-code/?size=150x150&data=${movieName}`}
                  alt="QR Code"
                />
              </Col>
            </Row>
          </Stack>

          <Divider   sx={{ borderColor: "black", marginTop: "20px",  marginBottom: "16px", borderBottomWidth:'2px'}}/>

          <Stack>
            <Typography variant="secondary h5" sx={{paddingBottom: "16px",borderBottom:'1px dashed black'}}>Order Summary</Typography>

            <Container style={{width:'70%',marginTop: "20px"}}>
                <Row >
                    <Col><h6>Ticket Cost</h6></Col>
                    <Col style={{textAlign:'end'}}>{slicedArray.map(a=>a.seats)}*&#8377;{slicedArray.map(a=>a.amount)}</Col>
                </Row>
                <Row>
                    <Col>SubTotal</Col>
                    <Col style={{textAlign:'end'}}>&#8377;{slicedArray.map(a=>a.seats) * slicedArray.map(a=>a.amount)}.00</Col>
                </Row>

                <Row>
                    <Col>GST</Col>
                    <Col style={{textAlign:'end'}}>&#8377;{Math.floor(slicedArray.map(a=>a.seats) * 4.36)}.00</Col>
                </Row>

                <Row className="mt-2">
                    <Col><h6>Grand Total</h6></Col>
                    <Col style={{textAlign:'end'}}><h6>Rs.{slicedArray.map(a=>a.grandTotal)}</h6></Col>
                </Row>
            </Container>
          </Stack>

          <Divider   sx={{ borderColor: "black", marginTop: "30px",  marginBottom: "16px", borderBottomWidth:'2px'}}/>

          <Stack>
            <Typography variant="body2" color={"black"} fontWeight={600}>IMPORTANT NOTES</Typography>
            <ul className="mt-3" style={{listStyleType:'none'}}>
                <li>Tickets & food once ordered cannot be exchanged, cancelled or refunded</li>
                <li>Children aged 3 years and above will require a separate ticket.</li>
                <li>The 3D glasses will be available at the cinema for 3D films and must be returned before you exit the premises. 3D Glasses are chargeable (refundable/ non-refundable) as per individual cinema policies.</li>
                <li>Items like laptop, cameras,knifes, lighter,match box, cigarettes, firearms and all types of inflammable objects are strictly prohibited.Items like carrybags eatables, helmets, handbags are not allowed inside the theaters are strictly prohibited. Kindly deposit at the baggage counter ofmall/ cinema.</li>
            </ul>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"  onClick={handleDownload}>
            Download
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTicketPdf;
