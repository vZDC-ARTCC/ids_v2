'use client';
import React, {useState} from 'react';
import {Airport} from "@prisma/client";
import {Autocomplete, Divider, Grid2, TextField, Typography} from "@mui/material";
import AirportCharts from "@/components/Airport/AirportCharts";

export default function RadarChartSelector({airports}: { airports: Airport[], }) {

    const [selectedIcao, setSelectedIcao] = useState<string | null>(null);

    return (
        <Grid2 size={9} sx={{border: 1}}>
            <Typography variant="h6">CHARTS</Typography>
            <Autocomplete
                options={airports.map((airport) => airport.icao)}
                freeSolo
                getOptionLabel={(option) => option}
                value={selectedIcao}
                onChange={(event, newValue) => setSelectedIcao(newValue?.toUpperCase() || null)}
                renderInput={(params) => <TextField {...params} size="small" label="Select Airport"
                                                    placeholder="You can also type in any ICAO code."
                                                    variant="outlined"/>}
                sx={{mx: 2, mt: 1,}}
            />
            <Divider sx={{my: 2,}}/>
            {selectedIcao && <AirportCharts icao={selectedIcao}/>}
        </Grid2>
    );
}