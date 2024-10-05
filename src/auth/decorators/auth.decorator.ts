import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../guard/jwt.guard";
export const Auth = () => UseGuards(JwtAuthGuard);
