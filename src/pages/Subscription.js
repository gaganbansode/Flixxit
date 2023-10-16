import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
// import { Card, Col, Row } from "antd";
// import { Radio } from "antd";
// import { Divider } from "antd";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";

import Typography from "@mui/joy/Typography";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

export const Subscription = () => {
  const [clientToken, setclientToken] = useState();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState(false);
  const [plan, setPlan] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/activity/braintree/token`
      );
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/activity/braintree/payment`,
        {
          nonce,
          plan,
        },
        {
          headers: {
            authentication1: auth?.token,
          },
        }
      );
      setLoading(false);
      navigate("/");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      <center>
        <Card
          variant="solid"
          color="primary"
          invertedColors
          sx={{
            boxShadow: "lg",
            width: 400,
            maxWidth: "100%",
            // to make the demo resizeable
            overflow: "auto",
            resize: "horizontal",
            mt: "20px",
            mb: "40px",
          }}
        >
          {/* <Box sx={{ display: "flex", gap: 1 }}>
            <Chip size="sm" variant="soft">
              Sketch 55+
            </Chip>
            <Chip size="sm" variant="soft">
              Figma
            </Chip>
          </Box> */}
          <div>
            <Typography level="h2">
              $10
              <Typography fontSize="sm" textColor="text.tertiary">
                /month
              </Typography>
            </Typography>
          </div>
          <CardContent>
            <Typography level="body-md">
              <div>
                <Typography
                  id="decorated-list-demo"
                  level="body-xs"
                  textTransform="uppercase"
                  fontWeight="lg"
                  mb={1}
                ></Typography>
                <List aria-labelledby="decorated-list-demo">
                  <ListItem>
                    <ListItemDecorator>Video quality : </ListItemDecorator> Good
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>Resolution : </ListItemDecorator> 2k, 4k
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>Devices : </ListItemDecorator> Mobile,
                    Tablet
                  </ListItem>
                </List>
              </div>
            </Typography>
          </CardContent>
          <div>
            {!clientToken || !auth?.token ? (
              ""
            ) : (
              <div>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                    googlepay: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              </div>
            )}
          </div>
          <CardActions>
            <Button
              variant="solid"
              onClick={handlePayment}
              disabled={loading || !instance}
            >
              {loading ? "Processing ...." : "Purchase Now"}
            </Button>
          </CardActions>
        </Card>
      </center>
      {/* <section className="container mt-4">
        <Row gutter={18}>
          <Col span={6}>
            <Card title="1 Month Plan $5" bordered={false}>
              <ul>
                <li>Video quality:Good</li>
                <li>Resolution:480p</li>
                <li>Devices you can use to watch: Mobile,Tablet </li>
              </ul>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="6 Months Plan $12" bordered={false}>
              <ul>
                <li>Video quality:Beter</li>
                <li>Resolution:720p</li>
                <li>Devices you can use to watch: Mobile,Tablet,Computer,TV</li>
              </ul>
            </Card>
          </Col>

          <Col span={6}>
            <Card title="12 Months Plan $20" bordered={false}>
              <ul>
                <li>Video quality:Best</li>
                <li>Resolution:4K+HDR</li>
                <li>Devices you can use to watch: Mobile,Tablet,Computer,TV</li>
              </ul>
            </Card>
          </Col>
        </Row>

        <div className="container">
          <Divider />
          {plan}
          <Radio.Group defaultValue={`${plan}`} buttonStyle="solid">
            <Radio.Button
              value="1"
              onClick={() => {
                setPlan(1);
              }}
            >
              1 Month
            </Radio.Button>
            <Radio.Button
              value="2"
              onClick={() => {
                setPlan(2);
              }}
            >
              6 Months
            </Radio.Button>
            <Radio.Button
              value="3"
              onClick={() => {
                setPlan(3);
              }}
            >
              12 Months
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="container">
          <div>
            {!clientToken || !auth?.token ? (
              ""
            ) : (
              <div>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                    googlepay: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              </div>
            )}
          </div>

          <button
            className="btn site-btn mt-2"
            onClick={handlePayment}
            disabled={loading || !instance}
          >
            {loading ? "Processing ...." : "Make Payment"}
          </button>
        </div>
      </section> */}
    </Layout>
  );
};
