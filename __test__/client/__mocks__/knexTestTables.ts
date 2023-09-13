
const testTables = {
  customerTestTable: (table: any) => {
    table.string('id');
    table.string('name');
    table.string('last_name');
    table.date('birth_date');
    table.string('email').unique();
    table.string('password');
    table.string('phone');
    table.string('gender');
    table.text('address');
    table.string('city');
    table.string('province');
    table.string('country');
    table.integer('zip_code');
    table.specificType('tokens', 'array string')
  }
}

export {
  testTables
}