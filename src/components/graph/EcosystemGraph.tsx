import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import {
  BorrowerNode,
  ApplicationNode,
  DeviceNexusNode,
  DealerNode,
  GuarantorNode,
  AccountNode
} from './CustomNodes';
import type { TimelinePhase } from '../../types/eeris';

const nodeTypes = {
  borrower: BorrowerNode,
  application: ApplicationNode,
  deviceNexus: DeviceNexusNode,
  dealer: DealerNode,
  guarantor: GuarantorNode,
  account: AccountNode
};

const INITIAL_NODES: Node[] = [
  {
    id: 'borrower-1',
    type: 'borrower',
    position: { x: 280, y: 40 },
    data: { label: 'S. Verma', subtitle: 'Borrower • Tier 1', badge: 'Applicant PAN' }
  },
  {
    id: 'app-78287',
    type: 'application',
    position: { x: 440, y: 140 },
    data: { label: 'APP-78287', risk: '86', subtitle: 'Auto Loan' }
  },
  {
    id: 'device-9810',
    type: 'deviceNexus',
    position: { x: 570, y: 260 },
    data: { label: 'DEV-9810', tagline: 'SHARED NEXUS', badge: '4 Concurrently Active Loans' }
  },
  {
    id: 'app-78294',
    type: 'application',
    position: { x: 720, y: 140 },
    data: { label: 'APP-78294', risk: '82', subtitle: 'Auto Loan' }
  },
  {
    id: 'borrower-2',
    type: 'borrower',
    position: { x: 840, y: 40 },
    data: { label: 'K. Rao', subtitle: 'Borrower • Tier 2', badge: 'Applicant PAN' }
  },
  {
    id: 'dealer-apex',
    type: 'dealer',
    position: { x: 280, y: 310 },
    data: { label: 'Apex Auto', subtitle: 'Dealer DL-402' }
  },
  {
    id: 'account-icici',
    type: 'account',
    position: { x: 320, y: 460 },
    data: { label: 'pay-apex@icici', subtitle: 'UPI Node Destination' }
  },
  {
    id: 'app-78308',
    type: 'application',
    position: { x: 570, y: 440 },
    data: { label: 'APP-78308', risk: '89', subtitle: 'Consumer Loan' }
  },
  {
    id: 'borrower-3',
    type: 'borrower',
    position: { x: 440, y: 560 },
    data: { label: 'M. Patel', subtitle: 'Borrower • Lead Flag' }
  },
  {
    id: 'borrower-4',
    type: 'borrower',
    position: { x: 710, y: 560 },
    data: { label: 'A. Singh', subtitle: 'Borrower (APP-78312)' }
  },
  {
    id: 'guarantor-8890',
    type: 'guarantor',
    position: { x: 860, y: 310 },
    data: { label: 'GNT-8890', subtitle: 'Repeated Guarantor' }
  }
];

const INITIAL_EDGES: Edge[] = [
  {
    id: 'e-b1-app1',
    source: 'borrower-1',
    target: 'app-78287',
    label: 'Applicant PAN',
    labelStyle: { fill: '#2563eb', fontSize: 10, fontWeight: 600 },
    style: { stroke: '#93c5fd', strokeWidth: 2 }
  },
  {
    id: 'e-app1-dev',
    source: 'app-78287',
    target: 'device-9810',
    label: 'Shared IMEI (Primary)',
    labelStyle: { fill: '#dc2626', fontSize: 10, fontWeight: 700 },
    style: { stroke: '#ef4444', strokeWidth: 3 }
  },
  {
    id: 'e-app2-dev',
    source: 'app-78294',
    target: 'device-9810',
    label: 'Shared IMEI (Secondary)',
    labelStyle: { fill: '#dc2626', fontSize: 10, fontWeight: 600 },
    style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 4' }
  },
  {
    id: 'e-b2-app2',
    source: 'borrower-2',
    target: 'app-78294',
    label: 'Applicant PAN',
    labelStyle: { fill: '#2563eb', fontSize: 10, fontWeight: 600 },
    style: { stroke: '#93c5fd', strokeWidth: 2 }
  },
  {
    id: 'e-dealer-app1',
    source: 'dealer-apex',
    target: 'app-78287',
    label: 'Dealer Sourced',
    labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 500 },
    style: { stroke: '#cbd5e1', strokeWidth: 1.5 }
  },
  {
    id: 'e-dealer-account',
    source: 'dealer-apex',
    target: 'account-icici',
    label: 'UPI routed',
    labelStyle: { fill: '#059669', fontSize: 10, fontWeight: 600 },
    style: { stroke: '#10b981', strokeWidth: 2 }
  },
  {
    id: 'e-dev-app3',
    source: 'device-9810',
    target: 'app-78308',
    label: 'Device Reuse (+3h window)',
    labelStyle: { fill: '#dc2626', fontSize: 10, fontWeight: 600 },
    style: { stroke: '#ef4444', strokeWidth: 2 }
  },
  {
    id: 'e-app3-b3',
    source: 'app-78308',
    target: 'borrower-3',
    style: { stroke: '#cbd5e1', strokeWidth: 1.5 }
  },
  {
    id: 'e-app3-b4',
    source: 'app-78308',
    target: 'borrower-4',
    style: { stroke: '#cbd5e1', strokeWidth: 1.5 }
  },
  {
    id: 'e-gnt-app2',
    source: 'guarantor-8890',
    target: 'app-78294',
    label: 'Listed Guarantor',
    labelStyle: { fill: '#4f46e5', fontSize: 10, fontWeight: 500 },
    style: { stroke: '#a5b4fc', strokeWidth: 1.5 }
  }
];

interface EcosystemGraphProps {
  timelinePhase?: TimelinePhase;
  onNodeClick?: (nodeId: string) => void;
}

export const EcosystemGraph: React.FC<EcosystemGraphProps> = ({
  timelinePhase = 'Current (Active)',
  onNodeClick
}) => {
  const filteredNodes = useMemo(() => {
    if (timelinePhase === 'Before Alert') {
      return INITIAL_NODES.filter(n => ['borrower-1', 'app-78287', 'device-9810'].includes(n.id));
    }
    if (timelinePhase === 'Alert (Day 0)') {
      return INITIAL_NODES.filter(n =>
        ['borrower-1', 'app-78287', 'device-9810', 'app-78294', 'borrower-2', 'dealer-apex', 'guarantor-8890'].includes(n.id)
      );
    }
    return INITIAL_NODES;
  }, [timelinePhase]);

  const filteredEdges = useMemo(() => {
    const activeNodeIds = filteredNodes.map(n => n.id);
    return INITIAL_EDGES.filter(
      e => activeNodeIds.includes(e.source) && activeNodeIds.includes(e.target)
    );
  }, [filteredNodes]);

  const [nodes, , onNodesChange] = useNodesState(filteredNodes);
  const [edges, , onEdgesChange] = useEdgesState(filteredEdges);

  return (
    <div className="relative w-full h-[620px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
      {/* Cluster Badge Header Top-Left Inside Canvas */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="font-bold text-sm text-slate-900">ECO-1024</span>
        <span className="text-slate-300">•</span>
        <span className="text-xs text-slate-600 font-medium">Synthetic Ring #4029</span>
        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Critical Topology
        </span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick && onNodeClick(node.id)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
        <Controls position="bottom-left" showInteractive={false} className="m-4" />
      </ReactFlow>

      {/* Entity Legend Bottom-Right Inside Canvas */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm text-xs space-y-2 min-w-[150px]">
        <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1">ENTITY LEGEND</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Borrower</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <span>Application</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Device Nexus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
            <span>Dealer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span>Guarantor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Account / UPI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
