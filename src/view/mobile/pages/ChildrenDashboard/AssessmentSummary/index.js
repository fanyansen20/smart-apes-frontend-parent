//React
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../../../config/api";

//Helper
import { format, parseISO } from "date-fns";
import useNotification from "../../../../../hooks/useNotification";

//MUI
import StarIcon from "@mui/icons-material/Star";
import { Container, Grid, Tooltip, Typography } from "@mui/material";

// Components
import Preloader from "../../../../../components/preloader/Preloader";
import PrimaryButton from "../../../../../components/PrimaryButton";

//Progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//Assets
import { ReactComponent as Cart } from "../../../../../assets/icons/cart-product-2.svg";
import { ReactComponent as Badge } from "../../../../../assets/images/assessment-summary-badge.svg";
import { default as Banner } from "../../../../../assets/images/assessment-summary-banner.svg";
import classes from "./_AssessmentSummary.module.scss";

//Constant
const ORDINAL = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

const AssessmentSummary = () => {
  const params = useParams();
  //   const childData = useOutletContext();
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
    <div className={classes.containerAssessmentSummary}>
      <div className={classes.assessmentHeader}>
        <p>Test Summary</p>
      </div>

      <Container maxWidth="lg">
        <div className={classes.content}>
          <header>
            <p>
              {`${ORDINAL[assessmentData?.attempt_number]} Assessment Test | ${
                assessmentData?.submit_date_formatted
              }`}
            </p>
          </header>

          <div
            className={classes.banner}
            style={{
              backgroundImage: `url(${Banner})`,
              backgroundSize: "cover",
            }}
          >
            <Grid container>
              <Grid item md={1.5} xs={12}>
                <div className={classes.containerBadge}>
                  <Badge />
                </div>
              </Grid>

              <Grid container md={10.5} xs={12}>
                <Grid
                  container
                  direction={"column"}
                  className={classes.bannerHeading}
                  xs={12}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <p>Total Score</p>
                  <p
                    className={classes.scoreNumber}
                  >{`${assessmentData?.score}%`}</p>
                </Grid>

                <Grid
                  container
                  gap={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                  className={classes.bannerContent}
                >
                  <Grid
                    item
                    md={10}
                    xs={12}
                    justifyContent={"center"}
                    className={classes.contentHeader}
                  >
                    <Typography>Result of each topic</Typography>
                  </Grid>

                  <Grid item md={10} xs={12}>
                    <Grid container className={classes.topicWrapper}>
                      {assessmentData?.topics?.map((item, index) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          className={classes.topicScore}
                        >
                          <Typography>{item.topic}</Typography>
                          <Typography>{item.scoreFraction}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {recommendationData.length > 0 && (
            <section>
              <h5 className={classes.sectionTitle}>Recommended Product</h5>
              <h6 className={classes.sectionSubTitle}>
                We recommend the following products based on their high scores
                and compatibility with your preferences
              </h6>
              <Grid container spacing={2}>
                {recommendationData.map((item, index) => (
                  <Grid item key={index} md={4} xs={6}>
                    <div className={classes.productCard}>
                      <div
                        onClick={() => handleRedirectProduct(item)}
                        className={classes.productImage}
                      >
                        <img src={item?.cover_image_url} alt="product" />
                        {item?.has_discount && (
                          <div className={classes.discountFlag}>
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
                        className={classes.cardContent}
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
                            className={classes.productName}
                          >
                            {item.title}
                          </Typography>
                        </Tooltip>

                        <div>
                          {item?.has_discount && (
                            <div>
                              <p className={classes.productPrice}>
                                {item.main_variant?.price_string}
                              </p>
                              <p className={classes.productBasePrice}>
                                {item.main_variant?.base_price_string}
                              </p>
                            </div>
                          )}

                          {!item?.has_discount && (
                            <p className={classes.productPrice}>
                              {item.main_variant?.price_string}
                            </p>
                          )}
                        </div>

                        <div className={classes.productStat}>
                          <div className={classes.ratings}>
                            <StarIcon fontSize="12" />
                            <p>{item.rating?.value}</p>
                          </div>

                          <p>Sold {item.stats?.total_sales}</p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(
                                item.id,
                                item.type,
                                item.main_variant.id
                              );
                            }}
                          >
                            <Cart />
                          </button>
                        </div>
                      </div>
                      {/* <div className={classes.productBtn}></div> */}
                    </div>
                  </Grid>
                ))}
              </Grid>
            </section>
          )}

          <section>
            <h5 className={classes.sectionTitle}>Summary Score</h5>
            <h6 className={classes.sectionSubTitle}>
              Based on your test results, your Summary Score is a reflection of
              your strengths and areas for improvement.
            </h6>
            <Grid container spacing={3}>
              {assessmentData?.topics?.length ? (
                assessmentData?.topics?.map((item, index) => (
                  <Grid item key={index} md={6} xs={12}>
                    <div className={classes.topicsCard}>
                      <div className={classes.topicsCardHeader}>
                        {item.topic}
                      </div>
                      <Grid
                        container
                        spacing={2}
                        className={classes.topicsCardContent}
                      >
                        <Grid item md={4.5} xs={12}>
                          <div className={classes.progressWrapper}>
                            <p className={classes.progressTitle}>Your Score</p>
                            <div className={classes.progressBar}>
                              <CircularProgressbar
                                value={item.score}
                                circleRatio={0.5}
                                strokeWidth={10}
                                styles={{
                                  root: {
                                    transform: "rotate(0.75turn)",
                                  },
                                  path: { stroke: "#4EB7B5" },
                                  trail: { stroke: "#F43064" },
                                }}
                              />
                              <p className={classes.progressText}>
                                {item.score}
                                <span>%</span>
                              </p>
                            </div>
                            <p className={classes.answered}>
                              Answered Correctly
                            </p>
                            <p className={classes.rightAnswer}>
                              <span>{item.total_correct_answers}</span>
                              {`/${item.total_questions}`}
                            </p>
                          </div>
                        </Grid>

                        <Grid item md={7.5} xs={12}>
                          <div className={classes.wrapperSubTopic}>
                            <div>
                              <table>
                                <thead>
                                  <tr>
                                    <td style={{ width: "55%" }}>Sub-Topics</td>
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
                <p className={classes.noTopics}>
                  There are no available topics in this assessment
                </p>
              )}
            </Grid>
          </section>
        </div>

        <div className={classes.btnBack}>
          <Link to={`/children/${childrenId}/assessment-central`}>
            <PrimaryButton fullWidth>Go to Assessment Central</PrimaryButton>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AssessmentSummary;
