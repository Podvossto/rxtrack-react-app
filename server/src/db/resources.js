// Describes what each list endpoint may select, sort and search.
// Only keys listed in `sortable` can reach ORDER BY, and the SQL for them
// comes from here, never from the request.

export const resources = {
  user: {
    from: "`user`",
    select: "user_id, username, name, isAdmin, email, tel",
    pk: "user_id",
    search: "name",
    sortable: {
      user_id: "user_id",
      username: "username",
      name: "name",
      isAdmin: "isAdmin",
      email: "email",
      tel: "tel",
    },
  },
  medicine: {
    from: `medicine
      INNER JOIN medtype ON medicine.type_id = medtype.type_id
      INNER JOIN medunit ON medicine.unit_id = medunit.unit_id
      INNER JOIN medlocation ON medicine.location_id = medlocation.location_id`,
    select:
      "medicine.*, medtype.medType, medunit.medUnit, medlocation.location_name, medlocation.rack, medlocation.room",
    pk: "med_id",
    search: "medicine.name",
    sortable: {
      med_id: "medicine.med_id",
      name: "medicine.name",
      status: "medicine.status",
      description: "medicine.description",
      medQuantity: "medicine.medQuantity",
      medType: "medtype.medType",
      medUnit: "medunit.medUnit",
      location_name: "medlocation.location_name",
    },
  },
  medtype: {
    from: "medtype",
    select: "*",
    pk: "type_id",
    search: "medType",
    sortable: { type_id: "type_id", medType: "medType", medTypeDetail: "medTypeDetail", Date: "Date" },
  },
  medunit: {
    from: "medunit",
    select: "*",
    pk: "unit_id",
    search: "medUnit",
    sortable: { unit_id: "unit_id", medUnit: "medUnit", Date: "Date" },
  },
  medlocation: {
    from: "medlocation",
    select: "*",
    pk: "location_id",
    search: "location_name",
    sortable: {
      location_id: "location_id",
      location_name: "location_name",
      rack: "rack",
      room: "room",
      quantity: "quantity",
    },
  },
  patient: {
    from: "patient",
    select: "*",
    pk: "patient_id",
    search: "patient_name",
    sortable: { patient_id: "patient_id", patient_name: "patient_name" },
  },
  inputstock: {
    from: "inputstock INNER JOIN `user` ON inputstock.user_id = `user`.user_id",
    select: "inputstock.input_id, inputstock.date, `user`.user_id, `user`.name",
    pk: "input_id",
    search: "`user`.name",
    sortable: {
      input_id: "inputstock.input_id",
      name: "`user`.name",
      date: "inputstock.date",
    },
  },
  outputstock: {
    from: `outputstock
      INNER JOIN \`user\` ON outputstock.user_id = \`user\`.user_id
      INNER JOIN patient ON outputstock.patient_id = patient.patient_id`,
    select:
      "outputstock.output_id, outputstock.date, `user`.user_id, `user`.name, patient.patient_id, patient.patient_name",
    pk: "output_id",
    search: "`user`.name",
    sortable: {
      output_id: "outputstock.output_id",
      name: "`user`.name",
      patient_name: "patient.patient_name",
      date: "outputstock.date",
    },
  },
};
