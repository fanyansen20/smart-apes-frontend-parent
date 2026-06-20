// React
import { useState } from "react";

// MUI
import { IconButton, Collapse, LinearProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Assets
import { ReactComponent as NoProgram } from "../../../../assets/images/no-program.svg";

const ProgramCard = ({ programs }) => {
  const [expanded, setExpanded] = useState([]);

  const handleExpandClick = (programId) => {
    if (expanded.includes(programId)) {
      const _expanded = expanded.filter((item) => !item);
      setExpanded(_expanded);
    } else {
      setExpanded([...expanded, programId]);
    }
  };

  return (
    <div className="containerProgram">
      <div className="cardHeader">
        <h3>Programs</h3>
        <h5>See All</h5>
      </div>
      {programs.length > 0 ? (
        <section>
          {programs?.map((program, programIndex) => (
            <div key={programIndex}>
              <div
                onClick={() => handleExpandClick(program.id)}
                className="program-card"
              >
                <div className="program-details">
                  <img src={program?.thumbnail} />
                  <div>
                    <h3>{program?.title}</h3>
                    <h5>Click to see details</h5>
                  </div>
                </div>
                <IconButton>
                  {expanded.includes(program.id) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </div>
              <Collapse
                in={expanded.includes(program.id)}
                timeout="auto"
                unmountOnExit
              >
                <div className="program-expand">
                  {program?.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="program-expand-item">
                      <img src={content?.thumbnail} />
                      <div className="program-expand-detail">
                        <h3>{content?.title}</h3>
                        <div className="progress-course-container">
                          <h5>Progress</h5>
                          <div className="progress-course">
                            <LinearProgress
                              className="progress-bar"
                              variant="determinate"
                              value={content?.progress}
                            />
                            <p>{content?.progress}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </section>
      ) : (
        <div className="noClass">
          <NoProgram />
          <p>No Program Yet</p>
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
