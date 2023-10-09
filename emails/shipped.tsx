//@ts-ignore
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  const baseUrl = process.env.VERCEL_URLa
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
export const ShippingTemplate = ({ orderId = '123',orderDate }: { orderId:string,orderDate:string }) => {

 

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Tracking Number</Text>
                <Text style={track.number}>1ZV218970300071628</Text>
              </Column>
              <Column align="right">
                <Link style={global.button}>Track Package</Link>
              </Column>
            </Row>
          </Section> */}
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={`https://denounceddisgraced.com/_next/image?url=%2Flogos%2FddLogo-removebg.png&w=640&q=75`}
              width="100"
              height="100"
              alt="thirdmerch"
              style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>Package Shipped</Heading>
            <Text style={global.text}>




</Text>
           
          </Section>
         
          
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
              <Column style={{ width: '170px' }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Fullfillment Date</Text>
                <Text style={track.number}>{orderDate.toString() }</Text>
              </Column>
            </Row>
          
          </Section>
          
          
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Text style={global.heading}>denounceddisgraced.com</Text>
            <Row style={categories.container}>
              <Column align="center">
                <Link href="https://denounceddisgraced.com/store" style={categories.text}>
                  T-shirts
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://denounceddisgraced.com/store" style={categories.text}>
                  Hoodies
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://denounceddisgraced.com/store" style={categories.text}>
                  Sweatshirts
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://denounceddisgraced.com/store" style={categories.text}>
                  Mugs
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: '12px' }} />
          <Section style={paddingY}>
            
            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
              Please contact us at contact@denounceddisgraced.com if you have any questions. (If you reply to this
              email, we won`t be able to see it.)
            </Text>
            <Text style={footer.text}>
              © 2023 denounceddisgraced, Inc. All Rights Reserved.
            </Text>
         
          </Section>
        </Container>
      </Body>
    </Html>
)};
  
export default ShippingTemplate;
  
  const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
  };
  
  const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
  };
  
  const paragraph = {
    margin: '0',
      lineHeight: '2',
    color:"#fff"
  };
  
  const global = {
    paddingX,
    paddingY,
    defaultPadding: {
      ...paddingX,
      ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold',color:"#FFF" },
    heading: {
      fontSize: '32px',
      lineHeight: '1.3',
      fontWeight: '700',
      textAlign: 'center',
        letterSpacing: '-1px',
        color: '#FFFFFF',

    } as React.CSSProperties,
    text: {
      ...paragraph,
      color: '#fff',
      fontWeight: '500',
    },
    button: {
      border: '1px solid #929292',
      fontSize: '16px',
      textDecoration: 'none',
      padding: '10px 0px',
      width: '220px',
      display: 'block',
      textAlign: 'center',
      fontWeight: 500,
      color: '#FFFFFF',
    } as React.CSSProperties,
    hr: {
      borderColor: '#E5E5E5',
      margin: '0',
    },
  };
  
  const main = {
    backgroundColor: 'black',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '10px auto',
    width: '600px',
    border: '1px solid #E5E5E5',
  };
  
  const track = {
    container: {
      padding: '22px 40px',
      backgroundColor: '#F7F7F7',
    },
    number: {
      margin: '12px 0 0 0',
      fontWeight: 500,
      lineHeight: '1.4',
      color: '#6F6F6F',
    },
  };
  
  const message = {
    padding: '40px 74px',
    textAlign: 'center',
  } as React.CSSProperties;
  
  const adressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
  };
  
  const recomendationsText = {
    margin: '0',
    fontSize: '15px',
    lineHeight: '1',
    paddingLeft: '10px',
    paddingRight: '10px',
  };
  
  const recomendations = {
    container: {
      padding: '20px 0',
    },
    product: {
      verticalAlign: 'top',
      textAlign: 'left' as const,
      paddingLeft: '2px',
      paddingRight: '2px',
    },
    title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
    text: {
      ...recomendationsText,
      paddingTop: '4px',
      color: '#747474',
    },
  };
  
  const menu = {
    container: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '20px',
      backgroundColor: '#F7F7F7',
    },
    content: {
      ...paddingY,
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    title: {
      paddingLeft: '20px',
      paddingRight: '20px',
      fontWeight: 'bold',
    },
    text: {
      fontSize: '13.5px',
      marginTop: 0,
      fontWeight: 500,
      color: '#FFF',
    },
    tel: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '32px',
      paddingBottom: '22px',
    },
  };
  
  const categories = {
    container: {
      width: '370px',
      margin: 'auto',
      paddingTop: '12px',
    },
    text: {
      fontWeight: '500',
      color: '#FFF',
    },
  };
  
  const footer = {
    policy: {
      width: '166px',
      margin: 'auto',
    },
    text: {
      margin: '0',
      color: '#AFAFAF',
      fontSize: '13px',
      textAlign: 'center',
    } as React.CSSProperties,
  };
  