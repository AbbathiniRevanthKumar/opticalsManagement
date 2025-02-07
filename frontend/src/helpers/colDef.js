const colDefs = {
  framesColumns: [
    {
      header: "Frame code",
      value: "f_code",
      pinned: "left",
      width: "100px",
    },
    {
      header: "Frame name",
      value: "f_name",
      pinned: "left",
      width: "200px",
    },
    {
      header: "Purchase date",
      value: "f_purchase_date",
      width: "180px",
      cellRender: (params) => {
        return params.value
          ? new Date(params.value).toLocaleDateString()
          : "";
      },
    },
    {
      header: "Quantity",
      value: "f_qty",
      width: "100px",
    },
    {
      header: "Material type",
      value: "f_material_name",
      width: "180px",
    },
    {
      header: "Model type",
      value: "f_model_name",
      width: "180px",
    },
    {
      header: "Company name",
      value: "f_company_name",
      width: "180px",
    },
    {
      header: "Frame size",
      value: "f_size",
      width: "100px",
    },
    {
      header: "Purchase price",
      value: "f_purchase_price",
      width: "150px",
    },
    {
      header: "Sales price",
      value: "f_sales_price",
      width: "150px",
    },
    {
      header: "Discount",
      value: "f_discount",
      width: "120px",
      cellRender : (params)=>{
        return params.value + " %"
      }
    },
    {
      header: "Extra details",
      value: "f_extra_details",
      width: "200px",
      cellRender : (params)=>{
        return params?.value ? params?.value.substring(0,22) + "..." : "";
      }
    },
  ],
};

export default colDefs;
