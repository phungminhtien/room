import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as joi from 'joi';

@Injectable()
export class JoinRoomValidationPipe implements PipeTransform {
  transform(values: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return values;
    } else {
      const schema = joi.object({
        password: joi.string().allow(null, ''),
        roomId: joi.string().length(32).required(),
        name: joi.string().required(),
      });

      const { error, value } = schema.validate(values);
      if (!value)
        throw new WsException({ message: 'Payload require an object' });
      if (error) throw new WsException({ message: error.message });
      return values;
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
