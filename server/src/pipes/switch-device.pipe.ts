import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as joi from 'joi';

@Injectable()
export class SwitchDeviceValidationPipe implements PipeTransform {
  transform(values: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return values;
    } else {
      const schema = joi.object({
        roomId: joi.string().length(32).required(),
        enabled: joi.boolean().required(),
        type: joi.string().allow('mic', 'camera', 'shareScreen').required(),
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
