import React from 'react';
import prisma from "@/lib/db";
import {notFound} from "next/navigation";
import {Grid2} from "@mui/material";
import Viewer from "@/components/Viewer/Viewer";
import ButtonsTray from "@/components/Tray/ButtonsTray";
import NotamInformation from "@/components/Notam/NotamInformation";
import TmuGridItem from "@/components/Tmu/TmuGridItem";
import AirportInformationSmall from "@/components/Airport/AirportInformationSmall";
import RadarBorderingSectorsGridItem from "@/components/Radar/RadarBorderingSectorsGridItem";

import RadarChartSelector from "@/components/Radar/RadarChartSelector";
import {Metadata} from "next";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const {id} = params;

    const airport = await prisma.radar.findUnique({
        where: {
            facilityId: id,
        },
        select: {
            facilityId: true,
        },
    });

    return {
        title: airport?.facilityId || 'UNKNOWN',
    }
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const {id} = params;

    const radar = await prisma.radar.findUnique({
        where: {
            facilityId: id,
        },
        include: {
            facility: true,
            connectedAirports: {
                include: {
                    runways: true,
                },
                orderBy: {
                    icao: 'asc',
                },
            },
        },
    });

    if (!radar) {
        notFound();
    }

    return (
        <Grid2 container columns={12}>
            <Grid2 size={8} height={250} sx={{border: 1,}}>
                {radar.connectedAirports.map((airport) => (
                    <AirportInformationSmall key={airport.id} airport={airport} runways={airport.runways}/>
                ))}
            </Grid2>
            <RadarBorderingSectorsGridItem radar={radar}/>
            <RadarChartSelector airports={radar.connectedAirports}/>
            <TmuGridItem facility={radar.facility}/>
            <NotamInformation facility={radar.facility} initialNotams={radar.notams} radar/>
            <ButtonsTray radar={radar}/>
            <Viewer/>
        </Grid2>
    );
}