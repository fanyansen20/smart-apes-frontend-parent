//React
import { useEffect, useState } from "react";

//Material UI
import { Grid, Typography, CircularProgress, Stack } from "@mui/material";

// component
import SkeletonCategoryMenu from "../../../../shared/Skeleton/skeletonCategoryMenu";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesData } from "../../../../../store/categories/categoriesSlice";

// helper
import handlerRedirectToMarketPlace from "../../../../../helper/redirectToMarketplace";
// import { isComingSoon } from "./constants";

// TODO : category level 1
const Category = ({ closeHandler, children, link, isComingSoon }) => {
  return (
    <a href={handlerRedirectToMarketPlace(`/category/${link}`)}>
      <Stack
        direction="row"
        justifyContent="space-between"
        className="categoryDiv"
        onClick={() => closeHandler(null)}
      >
        <Typography className="categoryText">{children}</Typography>
        {isComingSoon && (
          <div className="coming-soon-banner">
            <Typography>COMING</Typography>
            <Typography>SOON!</Typography>
          </div>
        )}
      </Stack>
    </a>
  );
};

// TODO : category level 2 and 3
const SubCategory = ({
  categories,
  closeHandler,
  children,
  imageIconMenu,
  link,
}) => {
  const childCategories = categories.children.filter((category) => {
    return category.slug;
  });

  return (
    <div className="subDiv" onClick={() => closeHandler(null)}>
      <a
        className="subCategoryDiv"
        href={handlerRedirectToMarketPlace(`/category/${link}`)}
      >
        <img width="50px" height="50px" src={imageIconMenu} />
        <Typography
          className="subCategoryText"
          onClick={() => closeHandler(null)}
        >
          {children}
        </Typography>
      </a>

      <Grid className="containerCategoryNextLevel">
        {childCategories.map((category, key) => (
          <a
            href={handlerRedirectToMarketPlace(
              `/category/${link}/${category.slug}`
            )}
            className="childCategoryDiv"
            key={key}
            style={{
              gridColumn:
                link === "education-material" &&
                category.display_string === "Secondary" &&
                "3",
              gridRow:
                link === "education-material" &&
                category.display_string === "Secondary" &&
                "1 / span 2",
              marginTop:
                category.path_slug === "education-material/education-readers" &&
                "-140px",
            }}
          >
            <Typography
              style={{
                background:
                  (key === 1 && "#84CAFF") ||
                  (key === 2 && "#FFB84C") ||
                  (key === 3 && "#F97066") ||
                  (key === 4 && "#32D583") ||
                  (key === 5 && "#85DFF3") ||
                  (key === 6 && "#82AAE3") ||
                  (key === 7 && "#BC3CE9") ||
                  (key === 8 && "#10A19D") ||
                  (key === 9 && "#8BBCCC"),
              }}
              className="categoryLevelTwo"
            >
              {category.display_string}
            </Typography>
            {category.children.map((item, key) => (
              <Typography key={key} className="categoryLevelThree">
                <a
                  href={handlerRedirectToMarketPlace(
                    `/category/${link}/${category.slug}/${item.slug}`
                  )}
                >
                  {item.display_string}
                </a>
              </Typography>
            ))}
          </a>
        ))}
      </Grid>
    </div>
  );
};

const NavigationCategories = (props) => {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoadCategories, setIsLoadCategories] = useState(false);

  useEffect(() => {
    setIsLoadCategories(categoriesData.isLoading);
    if (!categoriesData.dataCategories) {
      dispatch(getCategoriesData());
    } else {
      setCategories(categoriesData.dataCategories);
      setSubCategories([categoriesData.dataCategories[0]]);
    }
  }, [categoriesData]);

  const hoverHandler = (slug) => {
    const sub_categories = categories.filter((category) => {
      return category.slug == slug;
    });
    setSubCategories(sub_categories);
  };

  return (
    <Grid container maxWidth="xl" className="categoriesContainer">
      <Grid item md={2.5} className="parentCategories">
        <div className="parentCategoriesDiv">
          <div className="categoryContainer">
            {isLoadCategories ? (
              <>
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
                <SkeletonCategoryMenu />
              </>
            ) : (
              categories.map((category, key) => (
                <div onMouseEnter={() => hoverHandler(category.slug)} key={key}>
                  <Category
                    key={key}
                    closeHandler={props.handleClose}
                    link={category.slug}
                    isComingSoon={category?.is_coming_soon || false}
                  >
                    {category.display_string}
                  </Category>
                </div>
              ))
            )}
          </div>
        </div>
      </Grid>

      <Grid item md={9.5}>
        <div className="subCategories">
          {isLoadCategories ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ color: "#BC3CE9" }} />
            </p>
          ) : (
            subCategories.map((category, key) => (
              <SubCategory
                key={key}
                link={category.slug}
                categories={category}
                imageIconMenu={category.icon_menu_url}
                slug={category.slug}
                closeHandler={props.handleClose}
              >
                <Typography>{category.display_string}</Typography>
              </SubCategory>
            ))
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default NavigationCategories;
