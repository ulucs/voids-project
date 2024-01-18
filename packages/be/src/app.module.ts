import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForecastsModule } from './forecasts/forecasts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomingInventoryModule } from './incoming_inventory/incoming_inventory.module';
import { WeatherModule } from 'weather/weather.module';
import { LocationsModule } from './locations/locations.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ForecastsModule,
    IncomingInventoryModule,
    LocationsModule,
    WeatherModule,
    AnalyticsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
