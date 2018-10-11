export interface TabListener {
    notifyTabChanged(tabComponent: TabListener): void;
    getName(): string;
}

