import * as yup from 'yup';

async function SignUpValidation(data) {
    let schema = yup.object().shape({
        name: yup.string().email().required(),
        phone: yup.string().min(11).required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
    });

   return await schema.validate(data);

   // return await schema.isValid(data)
}

export default SignUpValidation;