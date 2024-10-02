import {Card, CardContent, Stack, Typography} from "@mui/material";
import {Info} from "@mui/icons-material";

export default function NotFound() {
    return (
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Info color="error"/>
                    <Typography>Airspace diagram not found.</Typography>
                </Stack>
            </CardContent>
        </Card>

    );
}