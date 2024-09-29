import React from 'react';
import {notFound} from "next/navigation";
import prisma from "@/lib/db";
import {Card, CardContent, Typography} from "@mui/material";
import RadarSectorForm from "@/components/Admin/RadarSector/RadarSectorForm";

export default async function Page({params}: { params: { id: string } }) {

    const {id} = params;

    const radar = await prisma.radar.findUnique({
        where: {
            id,
        },
    });

    if (!radar) {
        notFound();
    }

    const allRadars = await prisma.radar.findMany({
        include: {
            sectors: {
                orderBy: {
                    identifier: 'asc',
                },
            },
        },
        orderBy: {
            identifier: 'asc',
        },
    });

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>New Radar Sector - {radar.identifier}</Typography>
                <RadarSectorForm allRadars={allRadars} radar={radar}
                                 allRadarSectors={allRadars.flatMap(radar => radar.sectors)}/>
            </CardContent>
        </Card>
    );
}