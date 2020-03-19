`use strict`

const studentData = [
    {firstName: 'jigar', lastName: 'patel', image: 'image1'},
    {firstName: 'jay', lastName: 'Bhagivala', image: 'image2'},
    {firstName: 'jonty', lastName: 'patel', image: 'image3'}
];

const uploadFile = (parent, { file }) => {
    console.log('file like :', file);
    return true;
}

const upsertStudentDetail = ({id , input}) => {
    if (!id) {
        console.log('insert data');
        studentData.push(input);
        console.log(`image file like: `, input.imagefile);
        return ({message: `student inserted successfully`, students: input});
    }
    else {
        console.log('update data');
        studentData[id] = input;
        return ({message: `student update successfully`, students: input});
    }
}

module.exports = {
    upsertStudentDetail,
    uploadFile
}