import { Container, Grid } from "@mui/material";
import React from "react";
import SubHeaderCard from "../../components/SubHeaderCard";
import { privacyPolicies } from "./data";
import classes from "./style.module.scss";
import { ListInfo, PageTitle } from "./styledComponents";

function PrivacyPolicy() {
  return (
    <>
      <Container
        sx={{
          mt: 4,
          textAlign: "justify",
          width: "90%",
        }}
        maxWidth="xl"
      >
        <Grid container>
          <Grid item md="12">
            <SubHeaderCard>
              Effective : 13/02/2023 - Last Update : 13/02/2023
            </SubHeaderCard>
          </Grid>
          <Grid item md="12">
            <PageTitle>SMART APES Privacy Policy</PageTitle>
          </Grid>
          <Grid item md="12">
            <ListInfo>
              DATA PROTECTION NOTICE (SMART APES)
              <br />
              This Data Protection Notice (“Notice”) sets out the basis which
              GRIP Principle Pte Ltd (“GRIP Principle”, “we”, “us”, or “our”)
              may collect, use, disclose or otherwise process personal data of
              persons in accordance with the applicable personal data protection
              laws and regulations. This Notice applies to personal data in our
              possession or under our control, including personal data in the
              possession of organizations which we have engaged to collect, use,
              disclose or otherwise process personal data for our purposes.
            </ListInfo>
          </Grid>
          <Grid item md="12">
            <ol className={classes.orderedListNumber}>
              {privacyPolicies.map((privacyPolicy, index) => (
                <ListInfo key={`${privacyPolicy.title}${index}`}>
                  <li>
                    {privacyPolicy?.title}
                    {privacyPolicy?.list?.length === 1 && (
                      <ListInfo>{privacyPolicy.list[0]}</ListInfo>
                    )}
                    {privacyPolicy?.list?.length > 1 && (
                      <ol className={classes.subOrderedListNumber}>
                        {privacyPolicy?.list?.map((valueList, index) => (
                          <ListInfo key={index}>
                            <li>{valueList}</li>
                          </ListInfo>
                        ))}
                      </ol>
                    )}
                  </li>
                </ListInfo>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PrivacyPolicy;
