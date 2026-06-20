// React
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

//Helper
import { needLogoOnly } from "../../helper/services";

//Constants
import { dataFooters } from "./constants";

//Images
import iconEmail from "../../assets/icons/icon-email.svg";

//Material UI
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  InputBase,
  Link,
  Stack,
  Typography,
} from "@mui/material";

//Components
import FooterCard from "../footer/FooterCard";
import ReCAPTCHA from "react-google-recaptcha";

//Scss
import "./Footer.scss";

const Footer = () => {
  const [isCaptcha, setIsCaptcha] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const captchaRef = useRef(null);
  const { pathname } = useLocation();
  return (
    <Container maxWidth={needLogoOnly(pathname) ? "xl" : "lg"}>
      <FooterCard>
        <Stack direction="row">
          {dataFooters.map((data, indexData) => (
            <Grid
              key={indexData}
              item
              {...data.mediaSize}
              className="detailCardFooter"
            >
              {data.twoColumns &&
                data.contentWithImages?.map((contentWithImage) =>
                  contentWithImage.contentImages.map(
                    (contentImage, indexContentImage) => (
                      <Grid
                        key={indexContentImage}
                        sx={{ marginBottom: "20px" }}
                      >
                        <Typography variant="h6">
                          {contentWithImage.title}
                        </Typography>
                        <div className="imageContent">
                          <img
                            src={contentImage.image}
                            alt={contentImage.title}
                          />
                        </div>
                      </Grid>
                    )
                  )
                )}

              <Typography variant="h6">{data.title}</Typography>

              {!data.twoColumns &&
                data?.contentWithImages?.map(
                  (contentWithImage, indexContentWithImage) => (
                    <Grid
                      key={indexContentWithImage}
                      container
                      alignItems="center"
                      gap={4}
                    >
                      <img
                        style={{ padding: "20px" }}
                        src={contentWithImage.image}
                        alt={contentWithImage.title}
                      />
                      <Typography variant="subtitle1">
                        {contentWithImage.title}
                      </Typography>
                    </Grid>
                  )
                )}

              {data.contents?.map((content, indexContent) => (
                <Link
                  underline="none"
                  href={content.link ?? ""}
                  key={indexContent}
                >
                  <Typography variant="subtitle1">{content.title}</Typography>
                </Link>
              ))}
            </Grid>
          ))}
          <Grid item container gap="10px" md={4.5}>
            <Grid>
              <Typography variant="h6">Subscribe to our newsletter</Typography>
              <Typography variant="subtitle1" sx={{ marginTop: "-10px" }}>
                We&apos;ll send you a nice letter once per week. No Spam
              </Typography>
            </Grid>

            <div className="searchInputFooter">
              <InputBase
                className="searchInput"
                placeholder="youremail@mail.com"
                onChange={(e) => setIsEmail(e.target.value === "")}
                startAdornment={
                  <InputAdornment position="center">
                    <img src={iconEmail} alt="icon email" />
                  </InputAdornment>
                }
              />
            </div>

            <Grid item md={12}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={() => setIsCaptcha(false)}
                ref={captchaRef}
              />
            </Grid>
            <Grid>
              <Button
                className="subscribe-button"
                disabled={isEmail || isCaptcha}
                onClick={() => {
                  captchaRef.current.reset();
                }}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </FooterCard>
    </Container>
  );
};

export default Footer;
