// React
import { useState } from "react";

// MUI
import { Button, Grid } from "@mui/material";

// Components
import ModalConfirmation from "../../../modal/ModalConfirmation/ModalConfirmation";

/**
 *
 * @param {{
 * isPrimary : boolean
 * handlerOpenModalAddress : () => void
 * handlerDeleteAddress : () => void
 * }} props
 * @returns
 */

const AddressCard = ({
  handlerDeleteAddress,
  isPrimary,
  handlerOpenModalAddress,
  data,
}) => {
  const {
    name,
    is_default,
    receiver_name,
    address_detail,
    receiver_phone,
    country_name,
    postal_code,
  } = data;

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const handlerOpenModalConfirmation = () => setOpenModalConfirmation(true);
  const handlerCloseModalConfirmation = () => setOpenModalConfirmation(false);

  return (
    <div
      className={`address_card_container ${
        isPrimary ? "address_card_container__active" : ""
      }`}
      style={!is_default ? { cursor: "pointer" } : { cursor: "default" }}
    >
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Button className="btn_location">{name}</Button>
          {is_default && (
            <Button className="btn_address_primary">Primary</Button>
          )}
        </Grid>
        <Grid item md={5}>
          <div style={{ marginBottom: "1em" }}>
            <p className="address_label">Recipient</p>
            <p className="address_values">{receiver_name}</p>
          </div>
          <div>
            <p className="address_label">Full Address</p>
            <p className="address_values">
              {address_detail}, {postal_code}
            </p>
          </div>
        </Grid>
        <Grid item md={5}>
          <div style={{ marginBottom: "1em" }}>
            <p className="address_label">Phone Number</p>
            <p className="address_values">{receiver_phone}</p>
          </div>
          <div style={{ marginBottom: "1em" }}>
            <p className="address_label">Country</p>
            <p className="address_values">{country_name}</p>
          </div>
        </Grid>
        <Grid item md={2}>
          <Button
            onClick={handlerOpenModalAddress}
            fullWidth
            className="btn_edit_address"
          >
            Edit Address
          </Button>
          <Button
            fullWidth
            className="btn_delete_address"
            onClick={handlerOpenModalConfirmation}
          >
            Delete Address
          </Button>
        </Grid>
      </Grid>

      {/* <ModalAddAddress
        open={openModalAddress}
        title="Edit Address"
        handlerCloseModalAddress={handlerCloseModalAddress}
        dataAddress={data}
        getDataUserAddress={getDataUserAddress}
        isLoadData={isLoadData}
      /> */}

      <ModalConfirmation
        title="Delete Address"
        subTitle="Are you sure want to Delete the Address?"
        open={openModalConfirmation}
        handlerClose={handlerCloseModalConfirmation}
        handlerConfirm={handlerDeleteAddress}
      />
    </div>
  );
};

export default AddressCard;
