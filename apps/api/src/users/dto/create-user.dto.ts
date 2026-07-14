import {
 IsEmail,
 IsNotEmpty,
 IsOptional,
 IsEnum
} from 'class-validator';


export enum UserRole {

 USER = 'USER',

 ADMIN = 'ADMIN',

}


export class CreateUserDto {


 @IsNotEmpty()
 name!: string;



 @IsEmail()
 email!: string;



 @IsNotEmpty()
 password!: string;



 @IsOptional()
 @IsEnum(UserRole)
 role?: UserRole;


}