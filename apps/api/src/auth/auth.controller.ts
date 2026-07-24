import {
Body,
Controller,
Post,
} from '@nestjs/common';


import {
AuthService
} from './auth.service';


import {
LoginDto
} from './dto/login.dto';



@Controller('auth')
export class AuthController{


constructor(
private readonly authService:AuthService
){}



@Post('login')
login(
@Body()
dto:LoginDto
){

return this.authService.login(dto);

}




@Post('refresh')
refresh(
@Body('refresh_token')
token:string
){

return this.authService.refresh(token);

}



}