import React from 'react'
import {
    Container, Card, CardTitle, CardText, Button, Row, Col
} from 'reactstrap';
const Footer = () => {
    return (
        <footer className="page-footer pt-4" style={{ background: "#FFFFFF", boxShadow: "1px 1px 20px -4px gray" }}>
			<Container className="container-fluid TZS-Container text-center text-md-left" style={{ maxWidth: "1300px" }}>

				<Row>

					{/* <Col className="col-sm-6 col-md-6 col-lg-4" style={{ marginTop: "20px", marginBottom: "20px", align: "left" }}>
						<ul className="list-unstyled">
							<li>

							</li>
						</ul>
					</Col>
					
					<Col className="col-sm-6 col-md-6 col-lg-4" style={{ marginTop: "20px", marginBottom: "20px", align: "left" }}>
						<h5 className="text-uppercase">หัวเรื่อง 1</h5>
						<div className="footerHeadingLine" style={{ maxWidth: "55px" }}></div>
						<ul className="list-unstyled text-secondary">
							<div style={{ align: "left" }}>
								<li>
									<a href="../work" className="">
										<text className="footerMenuName">test <text class=""></text></text>
									</a>
								</li>
							</div>
						</ul>
					</Col>
					
					<Col className="col-sm-12 col-md-12 col-lg-4" style={{ marginTop: "20px", marginBottom: "20px", align:"left" }}>
						<h5 className="text-uppercase">หัวเรื่อง 2</h5>
						<div className="footerHeadingLine" style={{ maxWidth: "52px" }}></div>
						<ul className="list-unstyled">
							<li>

							</li>
						</ul>
					</Col> */}

				</Row>

			</Container>

			<div className="footer-copyright text-center py-3" style={{ background:"#4c5256", color:"#FFFFFF", fontSize:"15px" }}>
				โรงเรียนประสาทรัฐประชากิจ
			</div>
	    </footer>
    )
}
export default Footer;