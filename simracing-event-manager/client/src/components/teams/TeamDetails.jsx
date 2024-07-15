import { useEffect, useState } from 'react';
import { getById } from '../../services/teamService';
import { useParams } from 'react-router-dom';

export default function TeamDetails() {
    const { teamId } = useParams();
    const [team, setTeam] = useState({});

    useEffect(() => {
        (async function loadTeamData() {
            const teamData = await getById(teamId);
            setTeam(teamData);
        })();
    }, []);
    return(
        <>
            <h2>Details for team</h2>
            <ul>
                <li>{team.name}</li>
            </ul>
        </>
    );
}