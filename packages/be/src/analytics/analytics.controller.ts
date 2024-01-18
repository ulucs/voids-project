import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('low-sales-alerts')
  getLowSalesAlerts() {
    return this.analyticsService.getRollingSum(1000);
  }
}
