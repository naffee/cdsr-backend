import { ValidatorConstraint,ValidatorConstraintInterface,ValidationArguments,Validate } from "class-validator";

@ValidatorConstraint({async: false})
export class MatchPasswordValidator implements ValidatorConstraintInterface{validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object = args.object as any;
    return object.password === confirmPassword
}
    defaultMessage(args: ValidationArguments): string {
        return 'Password and confirmPassword must match'
    }
}