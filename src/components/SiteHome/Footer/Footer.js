import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      {/* <h1 style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
        GeeksforGeeks: A Computer Science Portal for Geeks
      </h1> */}
      <Container>
        <Row>
          <Column>
            <Heading>Services</Heading>
            <FooterLink>Adopt Pet</FooterLink>
            <FooterLink>Sell Pet</FooterLink>
            <FooterLink>Buy Products</FooterLink>
            <FooterLink>Fast Delivery</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink>Kochi</FooterLink>
            <FooterLink>Ahemdabad</FooterLink>
            <FooterLink>Indore</FooterLink>
            <FooterLink>Mumbai</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink>
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink>
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink>
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink>
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
