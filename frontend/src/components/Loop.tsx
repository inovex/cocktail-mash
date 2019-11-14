import * as React from 'react';

/* tslint:disable:no-empty */
export const LoopContext = React.createContext({
    destroy: (particleIndex: number) => {},
    register: (callback: any) => {},
    spawn: (node: React.ReactNode) => {},
    unregister: (id: number) => {}
});

let jobId = 0;
let particleId = 0;

interface LoopState {
    particles: Map<number, React.ReactNode>
}

class Loop extends React.PureComponent<{}, LoopState> {
    private particleMap = new Map();
    private loopMap = new Map();
    private loopId: number | null = null;
    private lastLoopRun: DOMHighResTimeStamp | null = null;
    
    constructor(props: any) {
        super(props);

        this.state = {
            particles: new Map()
        };
    }

    public componentWillUnmount() {
        if (this.loopId) {
            window.cancelAnimationFrame(this.loopId);
        }
    }

    public componentDidMount() {
        this.nextLoop();
    }

    public register = (callback: any) => {
        this.loopMap.set(jobId, callback);
        return jobId++;
    };

    public spawn = (...nodes: React.ReactNode[]) => {
        for (const node of nodes) {
            this.particleMap.set(particleId++, node);
        }
        this.setState({
            particles: new Map(this.particleMap)
        });
    }

    public unregister = (id: number) => {
        if (this.loopMap.has(id)) {
            this.loopMap.delete(id);
        }
    }

    public destroy = (particleIndex: number) => {
        this.particleMap.delete(particleIndex);
        this.setState({
            particles: new Map(this.particleMap)
        });
    }

    public render() {
        return <LoopContext.Provider value={{
            destroy: this.destroy,
            register: this.register,
            spawn: this.spawn,
            unregister: this.unregister
        }}>
            {this.renderParticles()}
            {this.props.children}
        </LoopContext.Provider>
    }

    private renderParticles = ()  => {
        const particles: React.ReactNode[] = [];
        this.particleMap.forEach((node, index) => {
            particles.push(React.cloneElement(node, { key: index, particleIndex: index }));
        });

        return particles;
    }

    private performLoop = (timestamp: DOMHighResTimeStamp) => {
        this.loopId = null;

        this.loopMap.forEach(callback => {
            callback(timestamp, timestamp - (this.lastLoopRun ? this.lastLoopRun : timestamp));
        });

        this.lastLoopRun = timestamp;
        this.nextLoop();
    }

    private nextLoop = () => {
        if (!this.loopId) {
            this.loopId = window.requestAnimationFrame(this.performLoop);
        }
    }
}

export default Loop;