import { ResponsivePie } from '@nivo/pie'


export const PieChart = (
    {
        active = 45,
        maintenance = 20,
        inactive = 35
    }
) => {

    const pieData = [
        {
            "id": "Active",
            "label": "Active",
            "value": active,
            "color": "#00BC31"
        },
        {
            "id": "Maintenance",
            "label": "Maintenance",
            "value": maintenance,
            "color": "#E2B842"
        },
        {
            "id": "Inactive",
            "label": "Inactive",
            "value": inactive,
            "color": "#ED1B24"
        },
        
    ]

    return (
        <ResponsivePie
            data={pieData}
            defaultHeight={280}
            margin={{ top: 30, right: 120, bottom: 30, left: 130 }}
            colors={{ datum: 'data.color' }}
            innerRadius={0.6}
            padAngle={0.6}
            cornerRadius={0}
            arcLinkLabel={e => `${e.id}`}
            arcLinkLabelsTextColor={(datum) => {
                switch (datum.id) {
                    case 'Maintenance': return '#eab308';
                    case 'Active': return '#00BC31';
                    case 'Inactive': return '#ED1B24';
                    default: return '#333';
                }
            }}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsDiagonalLength={20}
            arcLinkLabelsThickness={1.5}
            arcLinkLabelsStraightLength={14}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="white"
            
            theme={{
                labels: {
                    text: {
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'poppins',
                        fill: 'white', 
                    }
                },
                arcLinkLabels: {
                    text: {
                        fontSize: 14,
                        fontWeight: 400,
                        fontFamily: 'poppins',
                    }
                }
            }}

      />
  )
}

