import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateParam implements PipeTransform<string, Date> {
  transform(value: string) {
    if (!value) {
      return;
    }

    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const date = new Date(value);
      if (date.toString() === 'Invalid Date') {
        throw new BadRequestException(
          `Date parameter ${value} contains invalid date.`,
          'Invalid Date Parameter',
        );
      }

      return date;
    }

    throw new BadRequestException(
      `Date parameter ${value} is not in the format YYYY-MM-DD.`,
      'Invalid Date Parameter',
    );
  }
}
