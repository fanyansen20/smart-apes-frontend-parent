//React
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { API } from "../../../config/api";

//Helper
import { format, parseISO } from "date-fns";
import useNotification from "../../../hooks/useNotification";

//MUI
import StarIcon from "@mui/icons-material/Star";
import { Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import Preloader from "../../../components/preloader/Preloader";

//Progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//Assets
import { ReactComponent as Cart } from "../../../assets/icons/cart-product.svg";
import { ReactComponent as Badge } from "../../../assets/images/assessment-summary-badge.svg";
import {
  default as Banner,
  default as HeaderBg,
} from "../../../assets/images/assessment-summary-banner.svg";

//Constant
const ORDINAL = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

const AssessmentSummary = () => {
  const params = useParams();
  const childData = useOutletContext();
  const { childrenId, freeAssessmentId, attemptId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState();
  const [recommendationData, setRecommendationData] = useState([]);
  const [_msg, sendNotification] = useNotification();

  // Onload
  useEffect(() => {
    getSummary();
    getRecommendation();
  }, []);

  // Get product recommendation
  const getRecommendation = async () => {
    try {
      const resRecommended = await API.get(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}/score-recommends`
      );

      setRecommendationData(resRecommended.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get summary data
  const getSummary = async () => {
    try {
      const res = await API.get(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}/summary`
      );

      let summaryData = {
        ...res.data,
        submit_date_formatted: format(
          parseISO(res.data?.submit_date),
          "d-MMMM-yyyy"
        ),
        topics: res.data.topics?.map((item) => {
          return {
            ...item,
            score: item.score.toFixed(2),
            scoreFraction: `${item.total_correct_answers}/${item.total_questions}`,
          };
        }),
      };

      setAssessmentData(summaryData);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle redirect to product page marketplace
  const handleRedirectProduct = (product) => {
    const shopSlug = product?.shop_slug;
    const productSlug = product?.slug;
    const productId = product?.id;
    const shopId = product?.shop_id;
    const productUrl = `${process.env.REACT_APP_MARKETPLACE_URL}/${shopSlug}/${productSlug}?id=${productId}&shop_id=${shopId}`;

    window.open(productUrl, "_blank");
  };

  // Handle add item to cart
  const handleAddToCart = async (itemId, type, variantId) => {
    try {
      const payload = {
        item_id: itemId,
        qty: 1,
        type: type,
        variant_id: variantId,
      };

      await API.post(`/carts`, payload);

      sendNotification({
        msg: "Item added to cart",
        variant: "success",
      });
    } catch (error) {
      sendNotification({
        msg: "Cannot add to cart. Please try again later",
        variant: "error",
      });
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="containerAssessmentSummary">
      <Container maxWidth="lg">
        <div
          className="assessmentHeader"
          style={{ backgroundImage: `url(${HeaderBg})` }}
        >
          <p>{assessmentData?.title}</p>
          <p>|</p>
          <p>{childData?.full_name}’s Assessment Summary</p>
        </div>
        <div className="content">
          <header>
            <p>{assessmentData?.FreeAssessment?.subject} Subject</p>
            <p>
              {ORDINAL[assessmentData?.attempt_number]} Assessment Test |{" "}
              {assessmentData?.submit_date_formatted}
            </p>
          </header>
          <div className="banner" style={{ backgroundImage: `url(${Banner})` }}>
            <Grid container>
              <Grid item md={1.5} xs={12}>
                <div className="containerBadge">
                  <Badge />
                </div>
              </Grid>
              <Grid item md={10.5} xs={12}>
                <div className="bannerHeading">
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <p>Total Score</p>
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p>Result of each topics</p>
                    </Grid>
                  </Grid>
                </div>
                <hr />
                <div className="bannerContent">
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <div className="totalScore">
                        <h1 className="totalScoreText">
                          {assessmentData?.score}
                          <span className="percent">%</span>
                        </h1>
                      </div>
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <Grid container className="topicWrapper">
                        {assessmentData?.topics?.map((item, index) => (
                          <Grid
                            item
                            md={1.5}
                            xs={1.5}
                            key={index}
                            className="topicScore"
                          >
                            <p>{item.topic}</p>
                            <h1>{item.scoreFraction}</h1>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
          {recommendationData.length > 0 && (
            <section>
              <h5 className="sectionTitle">Recomended Product</h5>
              <h6 className="sectionSubTitle">
                We recommend the following products based on their high scores
                and compatibility with your preferences
              </h6>
              <Grid container spacing={2}>
                {recommendationData.map((item, index) => (
                  <Grid item key={index} md={2.4} xs={4}>
                    <div className="productCard">
                      <div
                        onClick={() => handleRedirectProduct(item)}
                        className="productImage"
                      >
                        <img src={item?.cover_image_url} alt="product" />
                        {item?.has_discount && (
                          <div className="discountFlag">
                            <p>
                              {item?.main_variant?.discount?.percent?.toFixed(
                                0
                              )}
                              %
                            </p>
                            <p>OFF</p>
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => handleRedirectProduct(item)}
                        className="cardContent"
                      >
                        <Tooltip
                          title={item.title}
                          placement="bottom-start"
                          followCursor
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "black",
                                maxWidth: "90px",
                              },
                            },
                          }}
                          PopperProps={{
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [7, 3],
                                },
                              },
                            ],
                          }}
                        >
                          <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              cursor: "context-menu",
                            }}
                            className="productName"
                          >
                            {item.title}
                          </Typography>
                        </Tooltip>

                        <div>
                          {item?.has_discount && (
                            <div>
                              <p className="productPrice">
                                {item.main_variant?.price_string}
                              </p>
                              <p className="productBasePrice">
                                {item.main_variant?.base_price_string}
                              </p>
                            </div>
                          )}

                          {!item?.has_discount && (
                            <p className="productPrice">
                              {item.main_variant?.price_string}
                            </p>
                          )}
                        </div>
                        <div className="productStat">
                          <div className="ratings">
                            <StarIcon fontSize="12" />
                            <p>{item.rating?.value}</p>
                          </div>
                          <p>Sold {item.stats?.total_sales}</p>
                        </div>
                      </div>
                      <div className="productBtn">
                        <Button
                          onClick={() =>
                            handleAddToCart(
                              item.id,
                              item.type,
                              item.main_variant.id
                            )
                          }
                          startIcon={<Cart />}
                          size="small"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </section>
          )}

          <section>
            <h5 className="sectionTitle">Summary Score</h5>
            <h6 className="sectionSubTitle">
              Based on your test results, your Summary Score is a reflection of
              your strengths and areas for improvement.
            </h6>
            <Grid container spacing={3}>
              {assessmentData?.topics?.length ? (
                assessmentData?.topics?.map((item, index) => (
                  <Grid item key={index} md={6} xs={12}>
                    <div className="topicsCard">
                      <div className="topicsCardHeader">{item.topic}</div>
                      <Grid container spacing={2} className="topicsCardContent">
                        <Grid item md={4.5} xs={12}>
                          <div className="progressWrapper">
                            <p className="progressTitle">Your Score</p>
                            <div className="progressBar">
                              <CircularProgressbar
                                value={item.score}
                                circleRatio={0.5}
                                strokeWidth={7}
                                styles={{
                                  root: {
                                    transform: "rotate(0.75turn)",
                                  },
                                  path: { stroke: "#4EB7B5" },
                                  trail: { stroke: "#F43064" },
                                }}
                              />
                              <p className="progressText">
                                {item.score}
                                <span>%</span>
                              </p>
                            </div>
                            <p className="answered">Answered Correctly</p>
                            <p className="rightAnswer">
                              <span>{item.total_correct_answers}</span>/{" "}
                              {item.total_questions}
                            </p>
                          </div>
                        </Grid>
                        <Grid item md={7.5} xs={12}>
                          <div className="wrapperSubTopic">
                            <p>Sub-Topics</p>
                            <div>
                              <table>
                                <thead>
                                  <tr>
                                    <td style={{ width: "55%" }}>
                                      Sub-Topics Name
                                    </td>
                                    <td style={{ width: "45%" }}>
                                      Answered Correctly
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.sub_topics?.map((val, idx) => (
                                    <tr key={idx}>
                                      <td>{val.sub_topic}</td>
                                      <td>
                                        {val.total_correct_answers}/
                                        {val.total_questions}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                ))
              ) : (
                <p className="noTopics">
                  There are no available topics in this assessment
                </p>
              )}
            </Grid>
          </section>
        </div>

        <div className="btnBack">
          <Link to={`/children/${childrenId}/assessment-central`}>
            <Button>Go to Assessment Central</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AssessmentSummary;
