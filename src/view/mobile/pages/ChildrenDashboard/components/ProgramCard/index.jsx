import React, { Fragment, useState } from "react";

// MUI
import CircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import {
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";

// Styles
import classes from "./_ProgramCard.module.scss";

/**
 * @typedef {
 * id: string;
 * title: string;
 * thumbnail: string;
 * content: Content[]
 * } Program
 */

/**
 * @typedef {
 * id: string;
 * title: string;
 * thumbnail: string;
 * progress: number
 * } Content
 */

/**
 * @param {{
 * programs: Program[];
 * seeMore: () => void;
 * }} param0
 */

const ProgramCard = ({ programs, seeMore }) => {
  // #region useState
  const [expanded, setExpanded] = useState([]);
  // #endregion

  const handleExpandClick = (programId) => {
    if (expanded.includes(programId)) {
      const _expanded = expanded.filter((item) => item !== programId);
      setExpanded(_expanded);
    } else {
      setExpanded([...expanded, programId]);
    }
  };

  return (
    <div>
      <Grid className={classes.title} xs={12}>
        {/* Section Title */}
        <Grid className={classes.programTitle}>
          <Typography>Programs</Typography>
          {programs?.length > 0 && (
            <div onClick={seeMore} className={classes.seeMoreTitle}>
              <p>See All</p>
            </div>
          )}
        </Grid>
      </Grid>
      {programs?.length > 0 ? (
        <Grid container xs={12} gap={1}>
          {programs?.slice(0, 2)?.map((programItem, index) => (
            <Fragment key={index}>
              {/* Program Item */}
              <Grid
                item
                xs={12}
                className={classes.programCardContainer}
                onClick={() => handleExpandClick(programItem.id)}
              >
                <Grid xs={12} className={classes.programDetail}>
                  <img src={programItem?.thumbnail} />
                  <div>
                    <h3>{programItem?.title}</h3>
                    <h5>Click to see details</h5>
                  </div>
                </Grid>
                <IconButton>
                  {expanded.includes(programItem.id) ? (
                    <CircleDownOutlinedIcon className={classes.collapse} />
                  ) : (
                    <CircleDownOutlinedIcon />
                  )}
                </IconButton>
              </Grid>
              {/* Collapse Program Detail */}
              <Grid xs={12} marginTop={-1}>
                <Collapse
                  in={expanded.includes(programItem.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <div className={classes.programExpand}>
                    {programItem?.content?.map((content, contentIndex) => (
                      <div
                        key={contentIndex}
                        className={classes.programExpandItem}
                      >
                        <img src={content?.thumbnail} />
                        <Grid className={classes.programExpandDetail} gap={1}>
                          <Grid item>
                            <h3>{content?.title}</h3>
                          </Grid>
                          <Grid
                            item
                            className={classes.progressCourseContainer}
                          >
                            <h5>Progress</h5>
                            <div className={classes.progressCourse}>
                              <LinearProgress
                                className={classes["progress-bar"]}
                                variant="determinate"
                                value={content?.progress}
                              />
                              <p>{content?.progress}%</p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProgramCard;
