import { Container, Grid } from "@mui/material";
import React from "react";
import SubHeaderCard from "../../components/SubHeaderCard";
import { termOfServices } from "./data";
import classes from "./style.module.scss";
import { ListInfo, PageTitle, SubTitle } from "./styledComponents";

function TermsOfServices() {
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
            <SubHeaderCard>Last Update : 13/02/2023</SubHeaderCard>
          </Grid>
          <Grid item md="12">
            <PageTitle>Terms of Services</PageTitle>
          </Grid>
          <Grid item md="12">
            <ol className={classes.orderedListNumber}>
              {termOfServices.map((term, index) => (
                <SubTitle key={`${term.title}${index}`}>
                  <li>
                    {term.title}
                    {term.list.length === 1 && (
                      <ListInfo>{term.list[0]}</ListInfo>
                    )}
                    {term.list.length > 1 && (
                      <ol className={classes.orderedListNumber}>
                        {term.list.map((valueList, index) => (
                          <ListInfo key={index}>
                            <li>{valueList}</li>
                          </ListInfo>
                        ))}
                      </ol>
                    )}
                  </li>
                </SubTitle>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TermsOfServices;
